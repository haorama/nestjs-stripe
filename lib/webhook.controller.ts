import { Controller, Post, Get } from "@nestjs/common";

@Controller('stripe')
export class WebhookController {
  @Get('webhook')
  async handle() {
    return true
  }
}