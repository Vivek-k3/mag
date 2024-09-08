import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { newKey } from '@v1/id';

export type OrgDocument = mongoose.HydratedDocument<Org>;

@Schema({ timestamps: true })
export class Org {
  @Prop({
    required: true,
    unique: true,
    default: newKey({ prefix: 'org', byteLength: 10 }),
  })
  orgId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: true })
  ownerIds: string[];

  @Prop({ required: true })
  members: string[];

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: false })
  deletedAt: Date;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
