import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import Stripe from "stripe";
import { STRIPE_EVENT_KEY } from "./constants";

@Injectable()
export class WebhookService implements OnApplicationBootstrap {
  constructor(
    // private reflector: Reflector,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner
  ) {}


  onApplicationBootstrap() {

  }

  handleWebhook(event: Stripe.Event) {

  }

  loadWebhookHandler() {
    // const providers = this.discoveryService.getProviders();
    //   const controllers = this.discoveryService.getControllers();
    //   [...providers, ...controllers]
    //     .filter(wrapper => wrapper.isDependencyTreeStatic())
    //     .filter(wrapper => wrapper.instance)
    //     .forEach((wrapper: InstanceWrapper) => {
    //       const { instance } = wrapper;

    //       const prototype = Object.getPrototypeOf(instance);
    //       this.metadataScanner.scanFromPrototype(
    //         instance,
    //         prototype,
    //         (methodKey: string) =>
    //           this.subscribeToWebhookEvent(instance, methodKey),
    //       );
    //   });
  }

  subscribeToWebhookEvent(instance: any, methodKey: any) {

  }
}