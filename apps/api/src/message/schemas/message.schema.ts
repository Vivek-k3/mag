import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { IsOptional, IsString, IsArray, IsEnum } from "class-validator";
import { newId } from "@v1/id";

export type MessageDocument = mongoose.HydratedDocument<Message>;

// Enum for message types
export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
  POLL = "poll",
  EVENT = "event",
  DOCUMENT = "document",
}

@Schema()
export class Message {
  @Prop({ required: true, enum: MessageType })
  @IsEnum(MessageType)
  messageType: MessageType;

  @Prop({ required: false })
  @IsString()
  text?: string; // For text messages

  @Prop({ required: false })
  @IsString()
  imageUrl?: string; // URL to the image

  @Prop({ required: false })
  @IsString()
  videoUrl?: string; // URL to the video

  @Prop({ required: false })
  @IsString()
  fileUrl?: string; // URL to the file

  @Prop({ required: false })
  @IsArray()
  pollOptions?: string[]; // For poll options

  @Prop({ required: false })
  @IsString()
  eventDetails?: string; // For event details

  @Prop({ required: false })
  @IsString()
  documentUrl?: string; // URL to the document

  @Prop({
    required: true,
    unique: true,
    default: newId("message", 12),
  })
  messageId: string;

  @Prop({ required: true })
  messageFrom: string;

  @Prop({ required: true })
  botId?: string;

  @Prop({ required: false })
  userId?: string;

  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: true, default: () => new Date() })
  updatedAt: Date;

  @Prop({})
  deletedAt?: Date;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
