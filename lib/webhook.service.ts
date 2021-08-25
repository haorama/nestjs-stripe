import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import Stripe from "stripe";
import { STRIPE_EVENT_KEY } from "./constants";

@Injectable()
export class WebhookService implements OnApplicationBootstrap {
  constructor(
    private reflector: Reflector,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner
  ) {}

  protected webhookHandlers: any[] = []

  onApplicationBootstrap() {
    this.loadWebhookHandler()
  }

  async handleWebhook(event: Stripe.Event) {
    const handler = this.webhookHandlers.find(handler => handler.eventType == event.type);

    if (handler) {
      return handler.method(event)
    }
  }

  private loadWebhookHandler() {
    const providers = this.discoveryService.getProviders();
      return providers
        .filter(wrapper => wrapper.isDependencyTreeStatic())
        .filter(wrapper => wrapper.instance)
        .forEach((wrapper: InstanceWrapper) => {
          const { instance } = wrapper;

          const prototype = Object.getPrototypeOf(instance);
          this.metadataScanner.scanFromPrototype(
            instance,
            prototype,
            (methodKey: string) =>
              this.setWebhookHandler(instance, methodKey),
          );
      });
  }

  private setWebhookHandler(instance: any, methodKey: any) {
    const eventType = this.reflector.get(STRIPE_EVENT_KEY, instance[methodKey])

    if (!eventType) return;

    this.webhookHandlers.push({
      eventType, method: instance[methodKey]
    })
  }
}