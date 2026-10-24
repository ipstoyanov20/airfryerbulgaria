import Link from 'next/link';
import { Star } from 'lucide-react';
import { formatPrice, type Product } from '@/lib/products';
import FryerArt from './FryerArt';

export default function ProductCard({ product }: { product: Product }) {
  const c = product.colors[0];
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] rounded-[28px] bg-sand overflow-hidden grid place-items-center p-8 transition-colors group-hover:bg-[#e4d8c6]">
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-medium">
            {product.badge}
          </span>
        )}
        <FryerArt
          shape={product.shape}
          body={c.body}
          accent={c.accent}
          className="w-full max-w-[260px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]"
        />
        <div className="absolute right-4 bottom-4 flex gap-1.5">
          {product.colors.map((col) => (
            <span key={col.name} title={col.name} className="size-3.5 rounded-full ring-2 ring-paper" style={{ background: col.body }} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-base">{product.name}</h3>
          <p className="text-sm text-ink-soft">
            {product.capacity} · {product.power}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium tabular-nums">{formatPrice(product.price)}</p>
          {product.oldPrice && <p className="text-sm text-ink-soft line-through tabular-nums">{formatPrice(product.oldPrice)}</p>}
        </div>
      </div>
      <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
        <Star className="size-3.5 fill-ember text-ember" /> {product.rating.toFixed(1)} · {product.reviews} отзива
      </p>
    </Link>
  );
}
