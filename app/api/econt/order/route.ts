import { NextRequest, NextResponse } from 'next/server';
import { econtConfig } from '@/lib/econt';
import { priceCart } from '@/lib/cart-pricing';

interface EcontError {
  message?: string;
  innerErrors?: EcontError[];
}

/** Econt nests the useful message inside innerErrors; flatten them into one string. */
function econtErrorMessage(err: EcontError | string | undefined): string {
  if (!err) return '';
  if (typeof err === 'string') return err.trim();
  return [err.message?.trim(), ...(err.innerErrors ?? []).map(econtErrorMessage)].filter(Boolean).join(' · ');
}

interface CustomerInfo {
  name?: string;
  phone?: string;
  email?: string;
  cityName?: string;
  postCode?: string;
  address?: string;
  officeCode?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customerInfo: CustomerInfo = body.customerInfo ?? {};
    const { lines, total, weight } = priceCart(body.items);

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.cityName) {
      return NextResponse.json({ error: 'Липсват данни за доставка.' }, { status: 400 });
    }
    if (!customerInfo.officeCode && !customerInfo.address) {
      return NextResponse.json({ error: 'Изберете офис или адрес за доставка.' }, { status: 400 });
    }

    const orderNumber = `AFB-${Date.now()}`;
    const packCount = lines.reduce((acc, l) => acc + l.quantity, 0);
    const { sender } = econtConfig;

    const econtPayload = {
      label: {
        senderClient: {
          ...(econtConfig.shopId ? { id: econtConfig.shopId } : {}),
          name: sender.name,
          phones: [sender.phone],
        },
        senderAddress: {
          city: { country: { code3: 'BGR' }, name: sender.city, postCode: sender.postCode },
          street: sender.street,
          num: sender.num,
        },
        receiverClient: {
          name: customerInfo.name,
          phones: [customerInfo.phone],
          email: customerInfo.email,
        },
        receiverAddress: {
          city: { country: { code3: 'BGR' }, name: customerInfo.cityName, postCode: customerInfo.postCode },
          ...(!customerInfo.officeCode ? { street: customerInfo.address || '' } : {}),
        },
        ...(customerInfo.officeCode ? { receiverOfficeCode: customerInfo.officeCode } : {}),
        packCount,
        shipmentType: 'PACK',
        weight,
        shipmentDescription: `Поръчка #${orderNumber}: ` + lines.map((l) => l.product.name).join(', '),
        orderNumber,
        sendDate: new Date().toISOString().split('T')[0],
        services: {
          cd: total.toFixed(2),
          cd_currency: econtConfig.currency,
          sms_notification: 1,
        },
        payAfterAccept: 1,
        paymentReceiverMethod: 'cash',
      },
      mode: 'create',
    };

    const response = await fetch(econtConfig.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: econtConfig.auth },
      body: JSON.stringify(econtPayload),
    });

    const responseText = await response.text();
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Invalid response from Econt API');
    }
    const data = JSON.parse(responseText);

    if (!response.ok || data.error) {
      // On failure Econt returns the error object at the root (HTTP 517), not under `error`.
      throw new Error(econtErrorMessage(data.error ?? (data.type ? data : undefined)) || 'Failed to create Econt label');
    }

    const waybillNumber = data.label?.shipmentNumber || data.shipmentNumber;

    return NextResponse.json({
      success: true,
      id: orderNumber,
      waybillNumber,
    });
  } catch (error) {
    console.error('Econt route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
