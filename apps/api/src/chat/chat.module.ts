import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }], 'chat'),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
