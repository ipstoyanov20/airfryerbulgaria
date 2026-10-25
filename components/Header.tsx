'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const nav = [
  { href: '/products', label: 'Модели' },
  { href: '/#faq', label: 'Доставка и плащане' },
];

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`font-semibold text-lg tracking-tight ${className}`}>
      airfryer<span className="text-brand">.bg</span>
    </Link>
  );
}

export default function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-brand transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-md px-3 h-10 text-sm font-medium hover:bg-ink/5 transition-colors cursor-pointer"
            aria-label="Отвори количката"
          >
            <ShoppingBag className="size-5" />
            <span className="hidden sm:inline">Количка</span>
            {count > 0 && (
              <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-brand text-white text-xs font-semibold tabular-nums">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden grid place-items-center size-10 rounded-md hover:bg-ink/5 cursor-pointer"
            aria-label="Меню"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-ink/10 px-4 py-2 flex flex-col">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)} className="py-3 border-b border-ink/5 last:border-0">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
