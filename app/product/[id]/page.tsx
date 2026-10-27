import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductBuyBox from '@/components/ProductBuyBox';
import { categories, getProduct, products } from '@/lib/products';
import { SITE_URL, jsonLd } from '@/lib/site';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<'/product/[id]'>): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) return {};
  const title = `${product.name} ${product.capacity} — air fryer с горещ въздух`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: { title, description: product.description, url: `/product/${product.id}`, images: [{ url: product.image, alt: product.name }] },
  };
}

export default async function ProductPage(props: PageProps<'/product/[id]'>) {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const more = related.length ? related : products.filter((p) => p.id !== product.id).slice(0, 4);

  const url = `${SITE_URL}/product/${product.id}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} ${product.capacity}`,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Aira' },
    category: `Air fryer — ${categories.find((c) => c.id === product.category)?.name ?? ''}`,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <nav className="flex items-center gap-1 text-sm text-ink-soft mb-8">
        <Link href="/" className="hover:text-ink">Начало</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/products" className="hover:text-ink">Модели</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductBuyBox product={product} />

      <section className="mt-24 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-semibold text-2xl ">Описание</h2>
          <p className="mt-4 text-lg text-ink-soft leading-relaxed text-pretty">{product.description}</p>
        </div>
        <div>
          <h2 className="font-semibold text-2xl ">Характеристики</h2>
          <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between py-3">
                <dt className="text-ink-soft">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between py-3">
              <dt className="text-ink-soft">Гаранция</dt>
              <dd className="font-medium">24 месеца</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-semibold text-2xl  mb-8">Може да харесате и</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {more.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
