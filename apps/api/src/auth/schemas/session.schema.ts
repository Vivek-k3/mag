import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { newKey } from '@v1/id';
export type SessionDocument = mongoose.HydratedDocument<Session>;

@Schema({ timestamps: true })
export class Session {
  @Prop({
    required: true,
    unique: true,
    default: newKey({ prefix: '', byteLength: 32 }),
  })
  sessionId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  access_token: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  ip: string;

  @Prop({ required: true })
  user_agent: string;

  @Prop({ required: true })
  refreshed_at: Date;

  @Prop({ required: false })
  tag: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
