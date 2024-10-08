import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ResendModule } from 'nestjs-resend';

@Module({
  imports: [
    ResendModule.forRoot({
      apiKey: process.env.RESEND_API_KEY,
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
