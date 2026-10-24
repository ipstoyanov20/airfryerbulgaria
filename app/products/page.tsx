import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { categories, products, type Category } from '@/lib/products';

export const metadata: Metadata = { title: 'Всички модели' };

const sorts = {
  popular: { label: 'Популярни', fn: (a: (typeof products)[0], b: (typeof products)[0]) => b.reviews - a.reviews },
  'price-asc': { label: 'Цена ↑', fn: (a: (typeof products)[0], b: (typeof products)[0]) => a.price - b.price },
  'price-desc': { label: 'Цена ↓', fn: (a: (typeof products)[0], b: (typeof products)[0]) => b.price - a.price },
};

export default async function ProductsPage(props: PageProps<'/products'>) {
  const sp = await props.searchParams;
  const category = (typeof sp.category === 'string' ? sp.category : undefined) as Category | undefined;
  const sort = (typeof sp.sort === 'string' && sp.sort in sorts ? sp.sort : 'popular') as keyof typeof sorts;

  const list = products.filter((p) => !category || p.category === category).sort(sorts[sort].fn);
  const active = categories.find((c) => c.id === category);

  const href = (params: { category?: string; sort?: string }) => {
    const q = new URLSearchParams();
    const c = 'category' in params ? params.category : category;
    const s = params.sort ?? sort;
    if (c) q.set('category', c);
    if (s !== 'popular') q.set('sort', s);
    const str = q.toString();
    return str ? `/products?${str}` : '/products';
  };

  const chip = (isActive: boolean) =>
    `rounded-full px-4 py-2 text-sm border transition-colors ${
      isActive ? 'bg-ink text-cream border-ink' : 'border-ink/15 hover:border-ink/40'
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl sm:text-6xl tracking-tight">{active ? active.name : 'Всички модели'}</h1>
      <p className="mt-3 text-ink-soft">{active ? active.hint : `${products.length} фритюрника с горещ въздух`}</p>

      <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-ink/10 py-4">
        <div className="flex flex-wrap gap-2">
          <Link href={href({ category: undefined })} className={chip(!category)}>Всички</Link>
          {categories.map((c) => (
            <Link key={c.id} href={href({ category: c.id })} className={chip(category === c.id)}>
              {c.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          {Object.entries(sorts).map(([k, v]) => (
            <Link key={k} href={href({ sort: k })} className={`px-3 py-2 rounded-full ${sort === k ? 'font-medium text-ember' : 'text-ink-soft hover:text-ink'}`}>
              {v.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {list.length === 0 && <p className="py-20 text-center text-ink-soft">Няма продукти в тази категория.</p>}
    </div>
  );
}
