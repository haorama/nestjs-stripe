import { Test } from '@nestjs/testing';
import { StripeModule } from './stripe.module';
import Stripe from 'stripe';

describe('StripeModule', () => {
  const secretKey = 'test';

  describe('register', () => {
    it('should register stripe module', async() => {
      const module = await Test.createTestingModule({
        imports: [StripeModule.register({secretKey})]
      }).compile()

      const stripe = module.get<Stripe>(Stripe);

      expect(stripe).toBeDefined()
      expect(stripe).toBeInstanceOf(Stripe)
    })
  })
})