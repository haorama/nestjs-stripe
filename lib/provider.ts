import { Provider } from "@nestjs/common";
import Stripe from "stripe";
import { StripeModuleOptions } from "./interfaces";

export function createStripeProvider(options: StripeModuleOptions): Provider {
  return {
    provide: Stripe,
    useValue: new Stripe(options.secretKey, options.stripeConfig),
  }
}