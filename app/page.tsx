import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Droplets, Leaf, RotateCcw, ShieldCheck, Star, Timer, Truck, Wind, Zap, Plus } from 'lucide-react';
import FryerArt from '@/components/FryerArt';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/lib/products';

const bestsellers = products.filter((p) => ['aira-classic-5-5', 'aira-duo-9', 'aira-vision-6', 'aira-mini-3-5'].includes(p.id));

const categoryArt = {
  compact: { shape: 'basket', body: '#efe6d8', accent: '#26231f', bg: 'bg-sand' },
  family: { shape: 'window', body: '#26231f', accent: '#ff5a1f', bg: 'bg-butter' },
  dual: { shape: 'dual', body: '#9aa88f', accent: '#26231f', bg: 'bg-[#dfe4d6]' },
  oven: { shape: 'oven', body: '#c9c7c2', accent: '#26231f', bg: 'bg-[#f3d6c6]' },
} as const;

const reviews = [
  { name: 'Мария К.', city: 'Пловдив', text: 'Пържените картофи са по-хрупкави, отколкото в тиган. Децата не усетиха разлика — аз усетих в сметката за олио.', product: 'Aira Classic' },
  { name: 'Георги Д.', city: 'Варна', text: 'Duo-то смени вечерите ни. Пилешко в едната кошница, зеленчуци в другата, готови в една и съща минута.', product: 'Aira Duo' },
  { name: 'Елена П.', city: 'София', text: 'Поръчах в понеделник, във вторник го взех от офиса на Еконт. Прозорецът е пристрастяващ.', product: 'Aira Vision' },
];

const faqs = [
  { q: 'Как се плаща?', a: 'Можете да платите с карта (Visa, Mastercard, Apple Pay, Google Pay) чрез защитената платформа на Stripe или с наложен платеж при получаване в офис на Еконт или до адрес.' },
  { q: 'Колко време отнема доставката?', a: 'Изпращаме в рамките на 24 часа в работни дни. Еконт доставя за 1–2 работни дни до всеки офис, автомат или адрес в България. Цената на доставката се изчислява при поръчка.' },
  { q: 'Мога ли да върна продукта?', a: 'Да — имате 30 дни да върнете продукта, ако не сте доволни, без да обяснявате защо.' },
  { q: 'Има ли гаранция?', a: 'Всички фритюрници са с 2 години гаранция. Покритията на кошниците са без PFAS и PFOA.' },
  { q: 'Наистина ли не трябва олио?', a: 'За замразени продукти — не. За пресни картофи и месо е достатъчна една лъжица олио за цялата кошница, което е до 80% по-малко мазнина от дълбоко пържене.' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-20 md:pt-16 md:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="relative z-10 animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/60 px-3 py-1.5 text-xs sm:text-sm">
              <span className="size-2 rounded-full bg-ember animate-pulse" /> Новата Aira Vision е тук
            </p>
            <h1 className="mt-6 font-display font-semibold tracking-[-0.04em] leading-[0.92] text-[clamp(2.75rem,8vw,6.5rem)] text-balance">
              Хрупкаво.
              <br />
              <span className="text-ember">Без</span> олио.
              <br />
              <span className="text-ink/30">Без чакане.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-soft text-pretty">
              Фритюрници с горещ въздух, които готвят до 50% по-бързо от фурна и с до 80% по-малко мазнина. Доставени до вратата ви с Еконт.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream pl-6 pr-2 py-2 font-medium hover:bg-ember transition-colors">
                Разгледай моделите
                <span className="grid place-items-center size-9 rounded-full bg-cream text-ink transition-transform group-hover:rotate-[-45deg]">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
              <Link href="#size-guide" className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 font-medium hover:bg-ink/5 transition-colors">
                Кой размер ми трябва?
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                ['24k+', 'доволни кухни'],
                ['4.9', 'среден рейтинг'],
                ['24ч', 'изпращане'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl sm:text-3xl tracking-tight">{v}</dt>
                  <dd className="text-sm text-ink-soft">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute inset-0 m-auto aspect-square w-[90%] rounded-full bg-[radial-gradient(circle,#ffb347_0%,#ff5a1f_45%,transparent_70%)] opacity-40 blur-2xl" />
            <div className="relative aspect-square rounded-[40px] bg-ink overflow-hidden grid place-items-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#3a2418_0%,#1c1a17_65%)]" />
              <span className="absolute top-6 left-6 font-display text-[10rem] sm:text-[14rem] leading-none text-cream/[0.04] tracking-tighter select-none">200°</span>
              <FryerArt shape="window" body="#26231f" accent="#ff5a1f" className="relative w-[72%] animate-float drop-shadow-[0_40px_60px_rgba(255,90,31,0.25)]" />
              <div className="absolute left-4 sm:left-6 bottom-6 rounded-2xl bg-paper/95 backdrop-blur px-4 py-3 shadow-xl">
                <p className="text-xs text-ink-soft">Картофки · 200 °C</p>
                <p className="font-display text-lg flex items-center gap-2"><Timer className="size-4 text-ember" /> 14 мин</p>
              </div>
              <div className="absolute right-4 sm:right-6 top-6 rounded-2xl bg-ember text-white px-4 py-3 shadow-xl">
                <p className="text-xs opacity-80">Мазнини</p>
                <p className="font-display text-lg">−80%</p>
              </div>
              <Link href="/product/aira-vision-6" className="absolute right-4 sm:right-6 bottom-6 flex items-center gap-2 rounded-full bg-cream/10 border border-cream/20 backdrop-blur pl-4 pr-1.5 py-1.5 text-cream text-sm hover:bg-cream/20 transition-colors">
                Aira Vision · 119,90 € <span className="grid place-items-center size-7 rounded-full bg-cream text-ink"><ArrowUpRight className="size-4" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-ink/10 bg-paper overflow-hidden py-4">
        <div className="flex w-max animate-marquee gap-12 font-display text-lg sm:text-xl whitespace-nowrap">
          {[...Array(2)].flatMap((_, k) =>
            ['Картофки', 'Пилешки крилца', 'Сьомга', 'Тиквички', 'Чийзкейк', 'Кюфтета', 'Броколи', 'Кроасани'].map((w) => (
              <span key={`${k}-${w}`} className="flex items-center gap-12">
                {w} <span className="text-ember">✺</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Truck, t: 'Доставка с Еконт', d: 'До офис, автомат или адрес' },
          { icon: ShieldCheck, t: '2 години гаранция', d: 'Сервиз в България' },
          { icon: RotateCcw, t: '30 дни връщане', d: 'Без въпроси' },
          { icon: Zap, t: 'Сигурно плащане', d: 'Карта чрез Stripe или наложен' },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="flex items-start gap-3">
            <span className="grid place-items-center size-11 shrink-0 rounded-2xl bg-paper border border-ink/10">
              <Icon className="size-5 text-ember" />
            </span>
            <div>
              <p className="font-medium">{t}</p>
              <p className="text-sm text-ink-soft">{d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between gap-6 mb-8">
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-balance">Намери своя формат</h2>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:text-ember">
            Всички <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => {
            const art = categoryArt[c.id];
            return (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className={`group relative overflow-hidden rounded-[28px] ${art.bg} p-5 sm:p-6 min-h-64 sm:min-h-80 flex flex-col justify-between ${i === 0 ? 'lg:row-span-1' : ''}`}
              >
                <div className="pr-10">
                  <p className="font-display text-[15px] sm:text-xl hyphens-auto break-words" lang="bg">{c.name}</p>
                  <p className="text-sm text-ink/60">{c.hint}</p>
                </div>
                <FryerArt shape={art.shape} body={art.body} accent={art.accent} className="w-2/3 self-end transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-3" />
                <span className="absolute right-4 top-4 grid place-items-center size-9 rounded-full bg-ink/90 text-cream transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-ember font-medium">Най-продавани</p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl tracking-tight">Любимците на сезона</h2>
          </div>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:text-ember">
            Виж всички {products.length} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TECH */}
      <section className="mx-4 sm:mx-6 rounded-[40px] bg-ink text-cream overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-ember font-medium">Технология Vortex 360°</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl tracking-tight leading-[0.95] text-balance">
              Горещ въздух. Студена сметка.
            </h2>
            <p className="mt-6 text-cream/60 text-lg max-w-md">
              Въздух до 240 °C циркулира с 2 800 оборота в минута около храната — реакцията на Майар става отвсякъде, без капка олио.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { icon: Wind, t: '360° въздушен поток', d: 'Равномерно запичане без обръщане' },
                { icon: Droplets, t: 'До 80% по-малко мазнини', d: 'Спрямо дълбоко пържене' },
                { icon: Timer, t: '50% по-бързо от фурна', d: 'Без предварително загряване' },
                { icon: Leaf, t: '−60% ток', d: 'В сравнение с конвекционна фурна' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="border-t border-cream/15 pt-4">
                  <Icon className="size-5 text-ember mb-3" />
                  <p className="font-medium">{t}</p>
                  <p className="text-sm text-cream/50">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square max-w-lg mx-auto w-full">
            {[100, 78, 56].map((s, i) => (
              <div
                key={s}
                className="absolute inset-0 m-auto rounded-full border border-dashed border-ember/40 animate-[spin_var(--d)_linear_infinite]"
                style={{ width: `${s}%`, height: `${s}%`, ['--d' as string]: `${20 + i * 8}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}
              />
            ))}
            <div className="absolute inset-0 m-auto w-[44%] h-[44%] rounded-full bg-[radial-gradient(circle,#ffb347,#ff5a1f_60%,transparent_72%)] blur-md opacity-70" />
            <FryerArt shape="basket" body="#c8643b" accent="#fff4e8" className="absolute inset-0 m-auto w-1/2" />
          </div>
        </div>
      </section>

      {/* SIZE GUIDE */}
      <section id="size-guide" className="mx-auto max-w-7xl px-4 sm:px-6 py-24 scroll-mt-20">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-ember font-medium">Ръководство за размер</p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl tracking-tight text-balance">Колко души сядат на масата?</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { people: '1–2', size: '3–4 л', pick: 'aira-mini-3-5', name: 'Aira Mini', note: 'Закуски, гарнитури, бързи вечери' },
            { people: '3–4', size: '5–6 л', pick: 'aira-classic-5-5', name: 'Aira Classic', note: 'Семейна вечеря от една кошница', featured: true },
            { people: '5+', size: '8 л+ или двойна', pick: 'aira-duo-9', name: 'Aira Duo', note: 'Основно и гарнитура наведнъж' },
          ].map((g) => (
            <Link
              key={g.people}
              href={`/product/${g.pick}`}
              className={`group rounded-[28px] p-8 border transition-colors ${g.featured ? 'bg-ember text-white border-ember' : 'bg-paper border-ink/10 hover:border-ink/30'}`}
            >
              <p className={`text-sm ${g.featured ? 'text-white/80' : 'text-ink-soft'}`}>души</p>
              <p className="font-display text-6xl sm:text-7xl tracking-tighter">{g.people}</p>
              <p className="mt-6 font-display text-xl">{g.size}</p>
              <p className={`text-sm ${g.featured ? 'text-white/80' : 'text-ink-soft'}`}>{g.note}</p>
              <p className="mt-8 inline-flex items-center gap-1 font-medium">
                Препоръка: {g.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-paper border-y border-ink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display text-3xl sm:text-5xl tracking-tight max-w-xl text-balance">Какво казват хората</h2>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-ember text-ember" />
                ))}
              </div>
              <p className="text-sm text-ink-soft"><b className="text-ink">4.9/5</b> от 4 000+ отзива</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-[28px] bg-cream p-8 flex flex-col">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-ember text-ember" />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed flex-1 text-pretty">„{r.text}“</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-ink/10 flex justify-between text-sm">
                  <span><b>{r.name}</b> · {r.city}</span>
                  <span className="text-ink-soft">{r.product}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 py-24 grid lg:grid-cols-[1fr_1.5fr] gap-12 scroll-mt-20">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight">Въпроси</h2>
          <p className="mt-4 text-ink-soft max-w-sm">Не намирате отговор? Пишете ни на hello@airfryer.bg — отговаряме до час в работно време.</p>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex items-center justify-between gap-6 cursor-pointer font-display text-lg">
                {f.q}
                <span className="grid place-items-center size-8 shrink-0 rounded-full border border-ink/15 transition-transform group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="mt-4 text-ink-soft leading-relaxed max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-4 sm:mx-6">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-butter px-6 sm:px-12 py-16 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-balance">30 рецепти за фритюрник. Безплатно.</h2>
            <p className="mt-3 text-ink/70">Абонирай се и получи нашата книга с рецепти + 10% отстъпка за първата поръчка.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2" action="#">
            <label htmlFor="nl-email" className="sr-only">Имейл</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="твоят@имейл.bg"
              className="flex-1 rounded-full bg-paper px-6 py-4 outline-none ring-ink/20 focus:ring-2"
            />
            <button className="rounded-full bg-ink text-cream px-8 py-4 font-medium hover:bg-ember transition-colors cursor-pointer">
              Изпрати
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
