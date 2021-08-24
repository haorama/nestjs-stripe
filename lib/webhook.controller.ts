import { Controller, Post } from "@nestjs/common";

@Controller('stripe')
export class WebhookController {
  @Post('webhook')
  async handle() {

  }
}