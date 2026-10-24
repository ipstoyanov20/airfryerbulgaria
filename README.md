# AirFryer.bg

Next.js 16 store for air fryers in Bulgaria, with Stripe card payments and Econt cash-on-delivery.

```bash
cp .env.example .env.local   # fill in Stripe + Econt keys
npm run dev
```

## Payments & delivery

| Flow | Files |
| --- | --- |
| Card (Stripe Checkout) | `app/api/checkout/route.ts` → `app/success/page.tsx` |
| Stripe webhook | `app/api/webhooks/stripe/route.ts` |
| Econt delivery iframe + COD label | `app/checkout/page.tsx` → `app/api/econt/order/route.ts`, `lib/econt.ts` |

Both API routes re-price the cart from `lib/products.ts` on the server — the browser only sends product ids and quantities.

Local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
