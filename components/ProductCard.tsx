import Link from 'next/link';
import { Star } from 'lucide-react';
import { formatPrice, type Product } from '@/lib/products';
import ProductImage from './ProductImage';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-square rounded-lg bg-muted overflow-hidden">
        <ProductImage
          product={product}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded bg-surface px-2 py-0.5 text-xs font-medium">{product.badge}</span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium group-hover:text-brand transition-colors">{product.name}</h3>
          <p className="text-sm text-ink-soft">
            {product.capacity} · {product.power}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold tabular-nums">{formatPrice(product.price)}</p>
          {product.oldPrice && <p className="text-sm text-ink-soft line-through tabular-nums">{formatPrice(product.oldPrice)}</p>}
        </div>
      </div>
      <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
        <Star className="size-3.5 fill-amber-500 text-amber-500" /> {product.rating.toFixed(1)} · {product.reviews} отзива
      </p>
    </Link>
  );
}
