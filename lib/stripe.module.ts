import { DynamicModule, Module, Provider } from "@nestjs/common";
import { STRIPE_SERVICE } from "./constants";
import { StripeModuleOptions } from "./interfaces";
import Stripe from 'stripe';

@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: STRIPE_SERVICE,
        useValue: new Stripe(options.secretKey, options.stripeConfig)
      }
    ]

    const controllers = [];

    if (options.webhook?.enabled) {
      controllers.push(require('./webhook.controller'))
    }

    return {
      providers,
      controllers,
      global: options.global ?? true,
      module: StripeModule,
      exports: providers,
    }
  }
}