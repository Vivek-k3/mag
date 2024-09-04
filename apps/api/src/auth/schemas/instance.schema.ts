import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InstanceDocument = HydratedDocument<Instance>;

// Instance model
@Schema({ timestamps: true })
export class Instance {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  auth_code: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  authentication_method: string;

  @Prop({ required: false })
  provider_access_token: string;

  @Prop({ required: false })
  provider_refresh_token: string;


}

export const InstanceSchema = SchemaFactory.createForClass(Instance);
