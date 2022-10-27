# Stripe Module For Nestjs
Under development

Use this package only for testing purpose

## Features
- Injectable feature from Stripe

## Installation
`npm install --save @haorama/nestjs-stripe`

`yarn add @haorama/nestjs-stripe`

## Usage
Register module in your app / root module

```typescript
import { StripeModule } from "@haorama/nestjs-stripe";

@Module({
  imports: [
    StripeModule.register({
      secretKey: "secretKey",
      stripeConfig: "optional config from Stripe.StripeConfig"
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
After registering module, you can inject the service from stripe package

```typescript
import Stripe from "stripe"

export class MyService {
  constructor(
    private stripe: Stripe
  ) {}

  async findCustomer(id: string) {
    return this.stripe.customers.retrieve(id)
  }
}
```
