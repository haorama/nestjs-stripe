import { Abstract, ModuleMetadata, Type } from '@nestjs/common';
import Stripe from 'stripe';

export interface StripeModuleOptions {
  global?: boolean
  stripeConfig?: Stripe.StripeConfig
  secretKey: string
}

export interface StripeOptionsFactory {
  createOptions(): Promise<StripeModuleOptions> | StripeModuleOptions
}

export interface StripeModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
  useClass?: Type<StripeOptionsFactory>
  useExisting?: Type<StripeOptionsFactory>,
  useFactory?: (...args: any[]) => Promise<StripeModuleOptions> | StripeModuleOptions;
}