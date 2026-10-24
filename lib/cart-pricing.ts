import { getProduct, type Product } from './products';

export interface CartLineInput {
  id: string;
  quantity: number;
  color?: string;
}

export interface PricedLine {
  product: Product;
  quantity: number;
  color?: string;
}

/**
 * Re-prices a cart from the server-side catalog. Never trust prices,
 * names or weights sent by the browser.
 */
export function priceCart(input: unknown): { lines: PricedLine[]; total: number; weight: number } {
  if (!Array.isArray(input) || input.length === 0) throw new Error('Количката е празна');

  const lines = input.map((raw: CartLineInput) => {
    const product = getProduct(String(raw?.id));
    const quantity = Math.floor(Number(raw?.quantity));
    if (!product) throw new Error(`Непознат продукт: ${raw?.id}`);
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) throw new Error('Невалидно количество');
    return { product, quantity, color: typeof raw.color === 'string' ? raw.color.slice(0, 40) : undefined };
  });

  const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const weight = lines.reduce((sum, l) => sum + l.product.weight * l.quantity, 0);
  return { lines, total: Math.round(total * 100) / 100, weight: Math.round(weight * 100) / 100 };
}
