import { SetMetadata } from "@nestjs/common";
import { STRIPE_EVENT_KEY } from "./constants";
import Stripe from 'stripe';

export const OnStripeEvent = (eventType: Stripe.WebhookEndpointCreateParams.EnabledEvent):
  MethodDecorator => SetMetadata(STRIPE_EVENT_KEY, eventType)