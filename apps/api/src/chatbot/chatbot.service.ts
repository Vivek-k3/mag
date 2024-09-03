import { Injectable } from '@nestjs/common';
import { ChatbotDocument } from './schemas/chatbot.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ChatbotService {
  constructor(
    @InjectModel('Chatbot', 'chat')
    private readonly chatbotModel: Model<ChatbotDocument>,
  ) {}
}
