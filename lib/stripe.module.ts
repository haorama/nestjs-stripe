import { DynamicModule, Module, Provider } from "@nestjs/common";
import { STRIPE_SERVICE } from "./constants";
import { StripeModuleOptions } from "./interfaces";
import Stripe from 'stripe';
import { WebhookService } from "./webhook.service";

@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    const provider: Provider = {
      provide: STRIPE_SERVICE,
      useValue: new Stripe(options.secretKey, options.stripeConfig)
    }

    return {
      providers: [provider, WebhookService],
      global: options.global ?? true,
      module: StripeModule,
      exports: [provider],
    }
  }
}