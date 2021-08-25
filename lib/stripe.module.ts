import { DynamicModule, Module, Provider } from "@nestjs/common";
import { StripeModuleAsyncOptions, StripeModuleOptions } from "./interfaces";
import Stripe from 'stripe';
import { WebhookService } from "./webhook.service";
import { DiscoveryModule } from "@nestjs/core";
import { createStripeProvider } from "./provider";

@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    const stripeProvider = createStripeProvider(options);

    return {
      module: StripeModule,
      global: options.global ?? true,
      providers: [WebhookService, stripeProvider],
      exports: [WebhookService, Stripe],
      imports: [DiscoveryModule]
    }
  }

  static registerAsync(options: StripeModuleAsyncOptions): DynamicModule {
    let isGlobal = true;

    const stripeProvider: Provider = {
      provide: Stripe,
      useFactory: (stripeModuleOptions: StripeModuleOptions) => {
        isGlobal = stripeModuleOptions.global ?? true;
        return new Stripe(stripeModuleOptions.secretKey, stripeModuleOptions.stripeConfig)
      }
    };

    return {
      global: isGlobal,
      module: StripeModule,
      imports: options.imports,
      exports: [Stripe, WebhookService],
    }
  }
}