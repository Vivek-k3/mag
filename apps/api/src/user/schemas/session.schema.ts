import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { newId } from '@v1/id';
import { v4 as uuidv4 } from 'uuid';
export type SessionDocument = mongoose.HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ required: true, unique: true, default: uuidv4() })
  sessionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  refreshedAt: Date;

  @Prop({ required: true })
  tag: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
