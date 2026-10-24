'use client';

import { useEffect } from 'react';
import { CART_STORAGE_KEY, useCart } from '@/contexts/CartContext';

/** Empties the cart once a paid Stripe session has been confirmed server-side. */
export default function ClearCart() {
  const { clearCart } = useCart();
  useEffect(() => {
    // Child effects run before CartProvider hydrates from storage, so wipe storage too.
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {}
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);
  return null;
}
