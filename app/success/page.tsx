import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock } from 'lucide-react';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { formatPrice } from '@/lib/products';
import ClearCart from '@/components/ClearCart';

export const metadata: Metadata = { title: 'Успешно плащане', robots: { index: false } };

export default async function SuccessPage(props: PageProps<'/success'>) {
  const { session_id } = await props.searchParams;

  let paid = false;
  let email: string | null = null;
  let amount: number | null = null;

  if (isStripeConfigured && typeof session_id === 'string' && session_id.startsWith('cs_')) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === 'paid';
      email = session.customer_details?.email ?? null;
      amount = session.amount_total != null ? session.amount_total / 100 : null;
    } catch (err) {
      console.error('Failed to retrieve Stripe session:', err);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      {paid && <ClearCart />}
      {paid ? <CheckCircle2 className="size-16 text-ember mx-auto mb-6" /> : <Clock className="size-16 text-ink-soft mx-auto mb-6" />}
      <h1 className="font-display text-3xl sm:text-4xl tracking-tight">
        {paid ? 'Плащането е успешно!' : 'Проверяваме плащането'}
      </h1>
      <p className="mt-4 text-ink-soft">
        {paid ? (
          <>
            Получихме {amount != null && <b className="text-ink">{formatPrice(amount)}</b>}.{' '}
            {email && <>Потвърждение е изпратено на <b className="text-ink">{email}</b>. </>}
            Ще изпратим поръчката с Еконт до 24 часа.
          </>
        ) : (
          'Не успяхме да потвърдим плащането. Ако сте платили, ще получите имейл с потвърждение до няколко минути.'
        )}
      </p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink text-cream px-8 py-4 font-medium hover:bg-ember transition-colors">
        Към началото
      </Link>
    </div>
  );
}
