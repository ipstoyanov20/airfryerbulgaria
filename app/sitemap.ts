import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    ...products.map((p) => ({
      url: `${SITE_URL}/product/${p.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: [`${SITE_URL}${p.image}`],
    })),
  ];
}
