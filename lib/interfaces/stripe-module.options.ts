import Stripe from 'stripe';
import { StripeWebhookOptions } from './stripe-webhook.options';

export interface StripeModuleOptions {
  global?: boolean
  webhook?: StripeWebhookOptions,
  stripeConfig?: Stripe.StripeConfig
  secretKey: string
}