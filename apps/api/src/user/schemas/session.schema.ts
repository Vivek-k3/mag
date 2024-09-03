import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { newKey } from '@v1/id';
export type SessionDocument = mongoose.HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({
    required: true,
    unique: true,
    default: newKey({ prefix: '', byteLength: 12 }),
  })
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
