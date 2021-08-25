import { DynamicModule, Global, Module } from "@nestjs/common";
import { STRIPE_SERVICE } from "./constants";
import { StripeModuleOptions } from "./interfaces";
import Stripe from 'stripe';
import { WebhookService } from "./webhook.service";
import { DiscoveryModule } from "@nestjs/core";

@Global()
@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    const stripeProvider = {
      provide: STRIPE_SERVICE,
      useValue: new Stripe(options.secretKey, options.stripeConfig),
    }

    return {
      module: StripeModule,
      global: options.global ?? true,
      providers: [WebhookService, stripeProvider],
      exports: [WebhookService, stripeProvider],
      imports: [DiscoveryModule]
    }
  }
}