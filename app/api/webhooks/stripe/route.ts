import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    if (!webhookSecret) {
      // Unsigned events are only accepted in local development.
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
      }
      console.warn('STRIPE_WEBHOOK_SECRET not set. Skipping signature verification (dev only).');
      event = JSON.parse(payload);
    } else {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
  } catch (err) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`Payment successful for session: ${session.id}`);
    // Handle post-payment logic here (save to DB, send email, create Econt label without COD, etc.)
  }

  return NextResponse.json({ received: true });
}
