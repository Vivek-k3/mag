import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { newKey } from '@v1/id';
import { HydratedDocument } from 'mongoose';

export type AuthLogDocument = HydratedDocument<AuthLog>;

@Schema({ timestamps: true })
export class AuthLog {
  @Prop({
    required: true,
    unique: true,
    default: newKey({ prefix: '', byteLength: 16 }),
  })
  logId: string;

  @Prop({ required: true })
  payload: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  userAgent: string;

}

export const AuthLogSchema = SchemaFactory.createForClass(AuthLog);
