import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsNumber,
  IsBoolean,
  IsArray,
  IsObject,
  IsBase64,
  IsUrl,
  ValidateNested,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export type AccountDocument = HydratedDocument<Account>;

// Account model
@Schema()
export class Account {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  providerAccountId: string;

  @Prop()
  refresh_token: string;

  @Prop()
  access_token: string;

  @Prop()
  expires_at: number;

  @Prop()
  token_type: string;

  @Prop()
  scope: string;

  @Prop()
  id_token: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
