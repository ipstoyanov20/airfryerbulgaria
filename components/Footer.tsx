import Link from 'next/link';
import { Logo } from './Header';
import { categories } from '@/lib/products';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-cream" />
          <p className="mt-4 text-cream/60 max-w-xs text-sm leading-relaxed">
            Фритюрници с горещ въздух, подбрани и тествани в България. Доставка до всеки офис на Еконт.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm mb-4">Магазин</h3>
          <ul className="space-y-2 text-sm text-cream/60">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`} className="hover:text-cream">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm mb-4">Помощ</h3>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><Link href="/#faq" className="hover:text-cream">Доставка и плащане</Link></li>
            <li><Link href="/#faq" className="hover:text-cream">Връщане до 30 дни</Link></li>
            <li><Link href="/#faq" className="hover:text-cream">Гаранция</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm mb-4">Контакт</h3>
          <ul className="space-y-2 text-sm text-cream/60">
            <li>Пон–Пет · 9:00–18:00</li>
            <li>hello@airfryer.bg</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-4 justify-between text-xs text-cream/50">
          <p>© {new Date().getFullYear()} AirFryer.bg · Всички цени са в евро с ДДС</p>
          <p className="flex gap-3">
            <span>Visa</span><span>Mastercard</span><span>Apple Pay</span><span>Google Pay</span><span>Наложен платеж</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
