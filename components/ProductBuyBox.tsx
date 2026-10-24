'use client';

import { useState } from 'react';
import { Check, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, type Product } from '@/lib/products';
import FryerArt from './FryerArt';

export default function ProductBuyBox({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const color = product.colors[colorIdx];

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
      <div className="relative aspect-square rounded-[40px] bg-sand grid place-items-center p-10 sm:p-16 overflow-hidden">
        <div className="absolute inset-0 m-auto w-2/3 h-2/3 rounded-full bg-paper/60 blur-3xl" />
        {product.badge && (
          <span className="absolute left-6 top-6 rounded-full bg-paper px-3 py-1 text-sm font-medium">{product.badge}</span>
        )}
        <FryerArt key={color.name} shape={product.shape} body={color.body} accent={color.accent} className="relative w-full max-w-md animate-rise" />
      </div>

      <div className="lg:py-6">
        <p className="flex items-center gap-1 text-sm text-ink-soft">
          <Star className="size-4 fill-ember text-ember" /> {product.rating.toFixed(1)} · {product.reviews} отзива
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">{product.name}</h1>
        <p className="mt-2 text-lg text-ink-soft">{product.tagline}</p>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-3xl tabular-nums">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-lg text-ink-soft line-through tabular-nums">{formatPrice(product.oldPrice)}</span>}
        </div>
        <p className="text-sm text-ink-soft">С включено ДДС</p>

        <div className="mt-8">
          <p className="text-sm mb-3">
            Цвят: <span className="font-medium">{color.name}</span>
          </p>
          <div className="flex gap-3">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                aria-label={c.name}
                aria-pressed={i === colorIdx}
                className={`size-10 rounded-full ring-offset-2 ring-offset-cream transition cursor-pointer ${i === colorIdx ? 'ring-2 ring-ink' : 'ring-1 ring-ink/15 hover:ring-ink/40'}`}
                style={{ background: c.body }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 text-center">
          {[
            ['Обем', product.capacity],
            ['Мощност', product.power],
            ['Макс.', product.specs['Температура']?.split('–')[1] ?? '—'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-ink/10 py-3">
              <p className="text-xs text-ink-soft">{k}</p>
              <p className="font-display text-sm sm:text-base">{v}</p>
            </div>
          ))}
        </div>

        <ul className="mt-8 space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check className="size-4 text-ember" /> {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-3">
          <div className="flex items-center rounded-full border border-ink/15">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid place-items-center size-12 cursor-pointer" aria-label="Намали">
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center tabular-nums">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid place-items-center size-12 cursor-pointer" aria-label="Увеличи">
              <Plus className="size-4" />
            </button>
          </div>
          <button
            onClick={() =>
              addToCart({ id: product.id, name: `${product.name} ${product.capacity}`, price: product.price, quantity: qty, color: color.name })
            }
            className="flex-1 rounded-full bg-ember text-white font-medium hover:bg-ember-deep transition-colors cursor-pointer"
          >
            Добави в количката
          </button>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-ink-soft">
          <p className="flex items-center gap-2"><Truck className="size-4" /> Изпращане до 24 ч · доставка 1–2 дни с Еконт</p>
          <p className="flex items-center gap-2"><ShieldCheck className="size-4" /> 2 години гаранция</p>
          <p className="flex items-center gap-2"><RotateCcw className="size-4" /> 30 дни право на връщане</p>
        </div>
      </div>
    </div>
  );
}
