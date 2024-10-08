import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Message', schema: MessageSchema }],
      'chat',
    ),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
