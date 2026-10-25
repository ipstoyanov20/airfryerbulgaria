import Image from 'next/image';
import type { Product } from '@/lib/products';

/** Product photo that fills its (relatively positioned) parent. */
export default function ProductImage({
  product,
  sizes,
  preload,
  className = '',
}: {
  product: Pick<Product, 'image' | 'name'>;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}
