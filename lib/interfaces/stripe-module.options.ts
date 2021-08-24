import Stripe from 'stripe';

export interface StripeModuleOptions {
  global?: boolean
  webhook?: any,
  stripeConfig?: Stripe.StripeConfig
  secretKey: string
}