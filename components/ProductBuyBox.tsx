'use client';

import { useState } from 'react';
import { Check, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, type Product } from '@/lib/products';
import ProductImage from './ProductImage';

export default function ProductBuyBox({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const color = product.colors[colorIdx];

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
      <div className="relative aspect-square rounded-lg bg-muted overflow-hidden">
        <ProductImage product={product} sizes="(min-width: 1024px) 50vw, 100vw" preload />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded bg-surface px-2 py-0.5 text-sm font-medium">{product.badge}</span>
        )}
      </div>

      <div>
        <p className="flex items-center gap-1 text-sm text-ink-soft">
          <Star className="size-4 fill-amber-500 text-amber-500" /> {product.rating.toFixed(1)} · {product.reviews} отзива
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">{product.name}</h1>
        <p className="mt-1 text-lg text-ink-soft">{product.tagline}</p>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl font-semibold tabular-nums">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-lg text-ink-soft line-through tabular-nums">{formatPrice(product.oldPrice)}</span>}
        </div>
        <p className="text-sm text-ink-soft">С включено ДДС</p>

        <div className="mt-8">
          <p className="text-sm mb-2">Цвят</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                aria-pressed={i === colorIdx}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                  i === colorIdx ? 'border-ink bg-surface' : 'border-ink/15 hover:border-ink/40'
                }`}
              >
                <span className="size-3.5 rounded-full ring-1 ring-ink/15" style={{ background: c.body }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-3 border border-ink/10 rounded-md divide-x divide-ink/10 text-center">
          {[
            ['Обем', product.capacity],
            ['Мощност', product.power],
            ['Макс.', product.specs['Температура']?.split('–')[1] ?? '—'],
          ].map(([k, v]) => (
            <div key={k} className="py-3">
              <dt className="text-xs text-ink-soft">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check className="size-4 text-brand" /> {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-3">
          <div className="flex items-center rounded-md border border-ink/15">
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
            className="flex-1 rounded-md bg-brand text-white font-medium hover:bg-brand-deep transition-colors cursor-pointer"
          >
            Добави в количката
          </button>
        </div>

        <div className="mt-8 grid gap-2 text-sm text-ink-soft">
          <p className="flex items-center gap-2"><Truck className="size-4" /> Изпращане до 24 ч · доставка 1–2 дни с Еконт</p>
          <p className="flex items-center gap-2"><ShieldCheck className="size-4" /> 2 години гаранция</p>
          <p className="flex items-center gap-2"><RotateCcw className="size-4" /> 30 дни право на връщане</p>
        </div>
      </div>
    </div>
  );
}
