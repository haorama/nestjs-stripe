import Stripe from 'stripe';

export interface StripeModuleOptions {
  global?: boolean
  stripeConfig?: Stripe.StripeConfig
  secretKey: string
}