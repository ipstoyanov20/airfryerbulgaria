import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { priceCart } from '@/lib/cart-pricing';

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured) {
      return NextResponse.json({ error: 'Плащането с карта все още не е конфигурирано.' }, { status: 503 });
    }

    const { items, customerName, customerEmail } = await request.json();
    const { lines } = priceCart(items);

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin).replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lines.map(({ product, quantity, color }) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: color ? `${product.name} ${product.capacity} · ${color}` : `${product.name} ${product.capacity}`,
            metadata: { product_id: product.id },
          },
          unit_amount: Math.round(product.price * 100), // price in cents
        },
        quantity,
      })),
      mode: 'payment',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
      customer_email: customerEmail || undefined,
      shipping_address_collection: {
        allowed_countries: ['BG'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      locale: 'bg',
      submit_type: 'pay',
      metadata: {
        customer_name: customerName || '',
        items: lines
          .map((l) => `${l.product.name}${l.color ? ` [${l.color}]` : ''} (${l.quantity})`)
          .join(', ')
          .substring(0, 500),
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
