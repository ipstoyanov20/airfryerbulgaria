import Link from 'next/link';
import { Logo } from './Header';
import { categories } from '@/lib/products';
import { imageCredits } from '@/lib/image-credits';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-ink/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 text-ink-soft max-w-xs text-sm leading-relaxed">
            Фритюрници с горещ въздух с доставка до всеки офис на Еконт.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Магазин</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`} className="hover:text-ink">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Контакт</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>Пон–Пет · 9:00–18:00</li>
            <li>hello@airfryer.eu</li>
            <li><Link href="/#faq" className="hover:text-ink">Доставка, връщане, гаранция</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col gap-2 text-xs text-ink-soft">
          <p>© {new Date().getFullYear()} AirFryer.eu · Всички цени са в евро с ДДС</p>
          <p>
            Снимки:{' '}
            {imageCredits.map((c, i) => (
              <span key={c.author}>
                {i > 0 && ' · '}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">{c.author}</a> ({c.license})
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
