import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsOptional, IsString } from 'class-validator';
import { newKey } from '@v1/id';
export type ChatDocument = mongoose.HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true, default: 'New Chat' })
  name: string;

  @Prop({
    required: true,
    unique: true,
    default: newKey({ prefix: 'c', byteLength: 10 }),
  })
  chatId: string;

  @Prop({ required: true })
  userId: string;

  // @Prop({ required: true })
  // slug: string;

  // @Prop({ required: true })
  // description: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({})
  deletedAt: Date;

  @Prop({ required: true, default: false })
  isPublic: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: true, default: false })
  isArchived: boolean;

  @Prop({ required: true, default: false })
  isStarred: boolean;

  @Prop({ required: true, default: false })
  isFavorite: boolean;

  @Prop({ required: true, default: false })
  isShared: boolean;

  @Prop({ required: true, default: [] })
  isSharedWith: string[];

  @Prop({ required: true, default: false })
  isSharedWithOrg: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
