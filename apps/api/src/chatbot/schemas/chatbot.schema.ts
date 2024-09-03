import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { newId } from '@v1/id';

export type ChatbotDocument = HydratedDocument<Chatbot>;

@Schema()
export class Chatbot {
  @Prop({ required: true, default: 'New Chatbot' })
  name: string;

  @Prop({ required: true, unique: true, default: newId('chatbot', 8) })
  botId: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true, default: 'You are a helpful assistant.' })
  botPrompt: string;

  @Prop({ required: true, default: false })
  isDefault: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: true, default: () => new Date() })
  updatedAt: Date;

  @Prop({})
  deletedAt?: Date;
}

export const ChatbotSchema = SchemaFactory.createForClass(Chatbot);
