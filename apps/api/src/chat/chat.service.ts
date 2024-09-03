import { Injectable } from '@nestjs/common';
import { ChatDocument } from './schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat', 'chat')
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  create(chat: ChatDocument) {
    return this.chatModel.create(chat);
  }

  findAll(userId: string) {
    return this.chatModel.find({ userId }).exec();
  }

  findById(id: string) {
    return this.chatModel.find({ chatId: id }).exec();
  }
}
