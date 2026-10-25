'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, getProduct } from '@/lib/products';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const { items, isOpen, setOpen, total, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-label="Количка"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-ink/10">
          <h2 className="font-semibold text-lg">Количка</h2>
          <button onClick={() => setOpen(false)} className="grid place-items-center size-9 rounded-md hover:bg-ink/5 cursor-pointer" aria-label="Затвори">
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-center px-8">
            <div>
              <p className="font-semibold text-xl mb-2">Количката е празна</p>
              <p className="text-ink-soft mb-6">Време е за нещо хрупкаво.</p>
              <Link href="/products" onClick={() => setOpen(false)} className="inline-flex rounded-md bg-brand text-white px-6 py-3 text-sm font-medium hover:bg-brand-deep transition-colors">
                Разгледай моделите
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-ink/10">
              {items.map((item) => {
                const product = getProduct(item.id);
                return (
                  <li key={item.key} className="flex gap-4 py-4">
                    <div className="relative size-20 shrink-0 rounded-md bg-muted overflow-hidden">
                      {product && <ProductImage product={product} sizes="80px" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="text-sm text-ink-soft">{item.color}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid place-items-center size-7 rounded-md border border-ink/15 hover:bg-ink/5 cursor-pointer" aria-label="Намали">
                          <Minus className="size-3" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid place-items-center size-7 rounded-md border border-ink/15 hover:bg-ink/5 cursor-pointer" aria-label="Увеличи">
                          <Plus className="size-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.key)} className="ml-auto grid place-items-center size-7 rounded-md text-ink-soft hover:text-brand cursor-pointer" aria-label="Премахни">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-ink/10 p-6 space-y-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Общо</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="block text-center rounded-md bg-brand text-white py-4 font-medium hover:bg-brand-deep transition-colors"
              >
                Към поръчката
              </Link>
              <p className="text-xs text-center text-ink-soft">Доставката се изчислява от Еконт при поръчка</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
