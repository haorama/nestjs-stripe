import { DynamicModule, Module, Provider } from "@nestjs/common";
import { StripeModuleAsyncOptions, StripeModuleOptions, StripeOptionsFactory } from "./interfaces";
import Stripe from 'stripe';
import { WebhookService } from "./webhook.service";
import { DiscoveryModule } from "@nestjs/core";
import { createStripeProvider } from "./provider";
import { STRIPE_MODULE_OPTIONS } from "./constants";

@Module({})
export class StripeModule {
  static register(options: StripeModuleOptions): DynamicModule {
    const stripeProvider = createStripeProvider(options);

    return {
      module: StripeModule,
      global: options.global ?? true,
      providers: [WebhookService, stripeProvider],
      exports: [Stripe, WebhookService],
      imports: [DiscoveryModule]
    }
  }

  static registerAsync(options: StripeModuleAsyncOptions): DynamicModule {
    let isGlobal = true;

    const stripeProvider: Provider = {
      provide: Stripe,
      inject: [STRIPE_MODULE_OPTIONS],
      useFactory: (stripeModuleOptions: StripeModuleOptions) => {
        isGlobal = stripeModuleOptions.global ?? true;
        return new Stripe(stripeModuleOptions.secretKey, stripeModuleOptions.stripeConfig)
      }
    };

    const imports = [];
    imports.push(DiscoveryModule)

    if (options.imports) imports.push(...options.imports)

    return {
      imports,
      global: isGlobal,
      module: StripeModule,
      exports: [Stripe, WebhookService],
      providers: [stripeProvider, WebhookService, ...this.createAsyncProviders(options)]
    }
  }

  private static createAsyncProviders(options: StripeModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: StripeModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: STRIPE_MODULE_OPTIONS,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: STRIPE_MODULE_OPTIONS,
      useFactory: (optionsFactory: StripeOptionsFactory) =>
        optionsFactory.createOptions(),
    };
  }
}