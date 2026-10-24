'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const nav = [
  { href: '/products', label: 'Всички модели' },
  { href: '/products?category=dual', label: 'Двойна кошница' },
  { href: '/#size-guide', label: 'Кой размер?' },
  { href: '/#faq', label: 'Въпроси' },
];

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`font-display font-semibold tracking-tight text-lg flex items-center gap-2 ${className}`}>
      <span className="relative grid place-items-center size-8 rounded-full bg-ember text-white">
        <span className="absolute inset-1.5 rounded-full border-2 border-white/80 border-t-transparent rotate-45" />
      </span>
      <span>
        airfryer<span className="text-ember">.bg</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="bg-ink text-cream text-xs sm:text-sm text-center py-2 px-4">
        Доставка с Еконт за 1–2 работни дни · 2 години гаранция · 30 дни връщане
      </div>
      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled ? 'bg-cream/80 backdrop-blur-xl border-b border-ink/10' : 'bg-cream'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="px-3 py-2 rounded-full hover:bg-ink/5 transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-ink text-cream pl-4 pr-3 h-10 text-sm font-medium hover:bg-ember transition-colors cursor-pointer"
              aria-label="Отвори количката"
            >
              <span className="hidden sm:inline">Количка</span>
              <ShoppingBag className="size-4" />
              <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-cream text-ink text-xs font-semibold tabular-nums">
                {count}
              </span>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden grid place-items-center size-10 rounded-full hover:bg-ink/5 cursor-pointer"
              aria-label="Меню"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="md:hidden border-t border-ink/10 px-4 py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-display text-lg border-b border-ink/5 last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
