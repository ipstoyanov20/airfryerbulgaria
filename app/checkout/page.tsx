'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, CreditCard, Lock, Minus, Plus, Trash2, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, getProduct } from '@/lib/products';
import ProductImage from '@/components/ProductImage';

/** Shape of the postMessage payload sent by Econt's delivery calculator iframe. */
interface EcontDeliveryData {
  id?: string;
  name?: string;
  face?: string;
  phone?: string;
  email?: string;
  'e-mail'?: string;
  city_name?: string;
  post_code?: string;
  address?: string;
  office_code?: string;
  office_name?: string;
  shipping_price?: number | string;
  shipping_price_cod?: number | string;
  shipping_price_currency?: string;
}

const econtCalcUrl = process.env.NEXT_PUBLIC_ECONT_SHIPPMENT_CALC_URL || 'https://deliver.econt.com/delivery';
const econtShopId = process.env.NEXT_PUBLIC_ECONT_SHOP_ID || '';
const econtCurrency = process.env.NEXT_PUBLIC_ECONT_CURRENCY || 'EUR';
const econtOrigin = new URL(econtCalcUrl).origin;

export default function CheckoutPage() {
  const { items, total, clearCart, updateQuantity, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'econt' | 'stripe'>('econt');
  const [econtData, setEcontData] = useState<EcontDeliveryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<{ id: string; waybillNumber?: string } | null>(null);

  const totalWeight = items.reduce((acc, item) => acc + (getProduct(item.id)?.weight ?? 5) * item.quantity, 0);
  const iframeUrl = `${econtCalcUrl}?id_shop=${econtShopId}&order_total=${total.toFixed(2)}&order_currency=${econtCurrency}&order_weight=${totalWeight.toFixed(2)}`;

  useEffect(() => {
    const handleEcontMessage = (event: MessageEvent) => {
      if (event.origin !== econtOrigin) return;
      const data = event.data;
      if (data && typeof data === 'object' && data.address !== undefined) {
        setEcontData((prev) => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
      }
    };
    window.addEventListener('message', handleEcontMessage);
    return () => window.removeEventListener('message', handleEcontMessage);
  }, []);

  const cartPayload = items.map((i) => ({ id: i.id, quantity: i.quantity, color: i.color }));

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      if (paymentMethod === 'econt') {
        if (!econtData) {
          setError('Моля, изберете адрес или офис за доставка от формата на Еконт.');
          return;
        }

        const response = await fetch('/api/econt/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartPayload,
            customerInfo: {
              name: econtData.name || econtData.face,
              phone: econtData.phone,
              email: econtData['e-mail'] || econtData.email || '',
              cityName: econtData.city_name,
              postCode: econtData.post_code,
              address: econtData.address,
              officeCode: econtData.office_code,
            },
          }),
        });

        const resData = await response.json();
        if (resData.success) {
          setOrder({ id: resData.id, waybillNumber: resData.waybillNumber });
          clearCart();
        } else {
          setError(resData.error || 'Поръчката не можа да бъде създадена.');
        }
      } else {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartPayload }),
        });
        const resData = await response.json();
        if (resData.url) {
          window.location.href = resData.url;
          return;
        }
        setError(resData.error || 'Плащането с карта не можа да бъде стартирано.');
      }
    } catch (err) {
      console.error(err);
      setError('Възникна грешка. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CheckCircle2 className="size-16 text-brand mx-auto mb-6" />
        <h1 className="font-semibold text-2xl sm:text-4xl ">Благодарим за поръчката!</h1>
        <p className="mt-4 text-ink-soft">
          Поръчка <b className="text-ink">{order.id}</b> е приета. Ще платите при получаване.
          {order.waybillNumber && (
            <>
              <br />
              Товарителница Еконт: <b className="text-ink">{order.waybillNumber}</b>
            </>
          )}
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-md bg-brand text-white px-6 py-3 font-medium hover:bg-brand-deep transition-colors">
          Продължи пазаруването
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-semibold text-2xl sm:text-4xl ">Количката е празна</h1>
        <p className="mt-4 text-ink-soft">Добавете фритюрник, за да продължите към поръчка.</p>
        <Link href="/products" className="mt-8 inline-flex rounded-md bg-brand text-white px-6 py-3 font-medium hover:bg-brand-deep transition-colors">
          Към магазина
        </Link>
      </div>
    );
  }

  const option = (active: boolean) =>
    `rounded-lg border-2 p-5 sm:p-6 cursor-pointer transition-colors ${active ? 'border-ink bg-surface' : 'border-ink/10 hover:border-ink/30'}`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <h1 className="font-semibold text-2xl sm:text-4xl ">Поръчка</h1>

      <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <section>
          <h2 className="font-semibold text-xl mb-4">1. Доставка и плащане</h2>
          <div className="space-y-4">
            {/* ECONT */}
            <div onClick={() => setPaymentMethod('econt')} className={option(paymentMethod === 'econt')}>
              <div className="flex items-center gap-4">
                <span className={`grid place-items-center size-12 shrink-0 rounded-md ${paymentMethod === 'econt' ? 'bg-brand text-white' : 'bg-muted'}`}>
                  <Truck className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">Наложен платеж с Еконт</h3>
                  <p className="text-sm text-ink-soft">Платете при получаване — в офис, автомат или до адрес.</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/econt-logo.png" alt="Еконт" className="h-5 object-contain opacity-60 shrink-0 hidden sm:block" />
              </div>

              {paymentMethod === 'econt' && (
                <div className="mt-6">
                  {!econtShopId && (
                    <p className="mb-3 rounded-md bg-amber-50 border border-amber-200 p-3 text-sm">
                      Еконт още не е конфигуриран (липсва <code>NEXT_PUBLIC_ECONT_SHOP_ID</code>).
                    </p>
                  )}
                  <iframe src={iframeUrl} className="w-full h-[600px] rounded-md bg-white border border-ink/10" title="Доставка с Еконт" />
                  {econtData && (
                    <div className="mt-4 rounded-md bg-brand/5 border-l-4 border-brand p-4 text-sm">
                      <p className="font-medium">Избран адрес за доставка</p>
                      <p>
                        {econtData.address || econtData.office_name || econtData.office_code}, {econtData.city_name}
                      </p>
                      {econtData.shipping_price_cod != null && (
                        <p className="mt-1 text-ink-soft">
                          Доставка: {econtData.shipping_price_cod} {econtData.shipping_price_currency || econtCurrency} (плаща се на куриера)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* STRIPE */}
            <div onClick={() => setPaymentMethod('stripe')} className={option(paymentMethod === 'stripe')}>
              <div className="flex items-center gap-4">
                <span className={`grid place-items-center size-12 shrink-0 rounded-md ${paymentMethod === 'stripe' ? 'bg-brand text-white' : 'bg-muted'}`}>
                  <CreditCard className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">Плащане с карта</h3>
                  <p className="text-sm text-ink-soft">Visa, Mastercard, Apple Pay, Google Pay — чрез Stripe. Адресът се въвежда на следващата стъпка.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:sticky lg:top-24 rounded-lg bg-surface border border-ink/10 p-6 sm:p-8">
          <h2 className="font-semibold text-xl mb-6">2. Вашата поръчка</h2>
          <ul className="divide-y divide-ink/10">
            {items.map((item) => {
              const product = getProduct(item.id);
              return (
                <li key={item.key} className="flex gap-4 py-4 first:pt-0">
                  <div className="relative size-16 shrink-0 rounded-md bg-muted overflow-hidden">
                      {product && <ProductImage product={product} sizes="80px" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <p className="text-sm text-ink-soft">{item.color}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid place-items-center size-6 rounded-md border border-ink/15 cursor-pointer" aria-label="Намали">
                        <Minus className="size-3" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid place-items-center size-6 rounded-md border border-ink/15 cursor-pointer" aria-label="Увеличи">
                        <Plus className="size-3" />
                      </button>
                      <button onClick={() => removeFromCart(item.key)} className="ml-auto text-ink-soft hover:text-brand cursor-pointer" aria-label="Премахни">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 pt-4 border-t border-ink/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">Продукти</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Доставка</span>
              <span>{paymentMethod === 'econt' ? 'по тарифа на Еконт' : 'изчислява се при плащане'}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-ink/10 flex justify-between font-semibold text-xl">
            <span>Общо</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || (paymentMethod === 'econt' && !econtData)}
            className="mt-6 w-full rounded-md bg-brand text-white py-4 font-medium hover:bg-brand-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Обработване…' : paymentMethod === 'econt' ? 'Завърши поръчката' : 'Продължи към плащане'}
          </button>

          {paymentMethod === 'econt' && !econtData && (
            <p className="mt-3 text-sm text-center text-ink-soft">Изберете адрес за доставка във формата на Еконт.</p>
          )}
          {error && <p className="mt-3 rounded-md bg-brand/10 text-brand-deep p-3 text-sm">{error}</p>}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
            <Lock className="size-3" /> Защитено плащане · данните на картата не минават през нас
          </p>
        </aside>
      </div>
    </div>
  );
}
