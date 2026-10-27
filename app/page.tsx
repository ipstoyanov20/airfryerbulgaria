import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, RotateCcw, ShieldCheck, Truck, CreditCard, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { SITE_NAME, SITE_URL, jsonLd } from '@/lib/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const faqs = [
  { q: 'Какво е air fryer (еърфрайър)?', a: 'Air fryer, или фритюрник с горещ въздух, е малък уред, който готви с много бързо циркулиращ горещ въздух вместо в олио. Така картофки, пилешко, зеленчуци и замразени храни стават хрупкави отвън и сочни отвътре — с до 80% по-малко мазнина и по-бързо от фурна.' },
  { q: 'Как да избера air fryer?', a: 'За малки порции стига кошница 3.5–4 л, за повече храна наведнъж — 5–8 л, а ако готвите основно и гарнитура едновременно, изберете модел с двойна кошница. Фурна-фритюрникът е най-гъвкав — пече, суши и върти шиш.' },
  { q: 'Как се плаща?', a: 'Можете да платите с карта (Visa, Mastercard, Apple Pay, Google Pay) чрез защитената платформа на Stripe или с наложен платеж при получаване в офис на Еконт или до адрес.' },
  { q: 'Колко време отнема доставката?', a: 'Изпращаме в рамките на 24 часа в работни дни. Еконт доставя за 1–2 работни дни до всеки офис, автомат или адрес в България. Цената на доставката се изчислява при поръчка.' },
  { q: 'Мога ли да върна продукта?', a: 'Да — имате 30 дни да върнете продукта, ако не сте доволни, без да обяснявате защо.' },
  { q: 'Има ли гаранция?', a: 'Всички фритюрници са с 2 години гаранция. Покритията на кошниците са без PFAS и PFOA.' },
  { q: 'Наистина ли не трябва олио?', a: 'За замразени продукти — не. За пресни картофи и месо е достатъчна една лъжица олио за цялата кошница, което е до 80% по-малко мазнина от дълбоко пържене.' },
];

export default function Home() {
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL, inLanguage: 'bg' },
    {
      '@context': 'https://schema.org',
      '@type': 'OnlineStore',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      email: 'hello@airfryer.eu',
      description: 'Онлайн магазин за air fryer фритюрници с горещ въздух с доставка в България.',
      areaServed: 'BG',
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-16 md:pt-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-balance">
            Air fryer — фритюрници с горещ въздух
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft text-pretty">
            Хрупкава храна с до 80% по-малко мазнина — без олио и без чакане. Изпращаме до 24 часа с Еконт до офис, автомат или адрес.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-md bg-brand text-white px-5 py-3 font-medium hover:bg-brand-deep transition-colors">
              Разгледай моделите <ArrowRight className="size-4" />
            </Link>
            <Link href="#faq" className="inline-flex items-center rounded-md border border-ink/20 px-5 py-3 font-medium hover:bg-ink/5 transition-colors">
              Доставка и плащане
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
          <Image
            src="/images/aira-classic.jpg"
            alt="Фритюрник с горещ въздух Aira Classic"
            fill
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-ink/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, t: 'Доставка с Еконт', d: '1–2 работни дни' },
            { icon: ShieldCheck, t: '2 години гаранция', d: 'Сервиз в България' },
            { icon: RotateCcw, t: '30 дни връщане', d: 'Без въпроси' },
            { icon: CreditCard, t: 'Карта или наложен', d: 'Сигурно плащане' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <Icon className="size-5 mt-0.5 shrink-0 text-brand" />
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-sm text-ink-soft">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Air fryer модели</h2>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
            Всички {products.length} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
          <Image src="/images/fries.jpg" alt="Картофки, приготвени във фритюрник с горещ въздух" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-balance">Защо air fryer?</h2>
          <ul className="mt-6 space-y-4">
            {[
              ['До 80% по-малко мазнина', 'Спрямо дълбоко пържене — за замразени продукти не трябва олио.'],
              ['До 50% по-бързо от фурна', 'Без дълго предварително загряване.'],
              ['По-малко ток', 'Загрява малък обем вместо цяла фурна.'],
            ].map(([t, d]) => (
              <li key={t} className="border-l-2 border-brand pl-4">
                <p className="font-medium">{t}</p>
                <p className="text-ink-soft">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-20 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-semibold">Често задавани въпроси</h2>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-6 cursor-pointer font-medium">
                {f.q}
                <Plus className="size-4 shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">Не намирате отговор? Пишете ни на hello@airfryer.eu.</p>
      </section>
    </>
  );
}
