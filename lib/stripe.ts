import 'server-only';
import Stripe from 'stripe';

// No apiVersion pin: the SDK uses the version it was built against.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  appInfo: {
    name: 'AirFryer Bulgaria',
    version: '0.1.0',
  },
});

export const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
