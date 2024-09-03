import { Injectable } from '@nestjs/common';
import { MessageDocument } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<MessageDocument>
  ){}
create(message: MessageDocument) {
  return this.messageModel.create(message);
}
findAll(userId: string) {
  return this.messageModel.find({userId}).exec();
}
findById(chatId: string) {
  return this.messageModel.find({chatId: chatId}).exec();
}
}
