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
@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  provider_account_id: string;

  @Prop()
  refresh_token: string;

  @Prop()
  access_token: string;

  @Prop()
  expires_in: number;

  @Prop()
  token_type: string;

  @Prop()
  scopes: string[];

  @Prop()
  id_token: string;

  @Prop({ type: Map, of: Object })
  metadata: Record<string, any>;

  @Prop({ default: () => new Date() })
  last_sign_in_at: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
