import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsOptional } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, default: uuidv4() })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  @IsOptional()
  email_confirmed_at: Date;

  @Prop({ required: false })
  @IsOptional()
  invitedAt: Date;

  @Prop({ required: false })
  @IsOptional()
  inviteCode: string;

  @Prop({ required: false })
  @IsOptional()
  confirmationToken: string;

  @Prop({ required: false })
  @IsOptional()
  confirmationSentAt: Date;

  @Prop({ required: false })
  recoveryToken: string;

  @Prop({ required: false })
  recoverySentAt: Date;

  @Prop({ required: false })
  last_sign_in_at: Date;

  @Prop({ required: false })
  providers: string[];

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  phoneConfirmedAt: Date;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: false })
  orgId: string;


  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
