import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RbacDocument = mongoose.HydratedDocument<Rbac>;

@Schema({ timestamps: true })
export class Rbac {
  @Prop({ required: true, unique: true })
  orgId: string;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  role: string[];
}

export const RbacSchema = SchemaFactory.createForClass(Rbac);
