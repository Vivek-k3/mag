import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { newKey } from '@v1/id';

export type OrgDocument = mongoose.HydratedDocument<Org>;

@Schema()
export class Org {
  @Prop({
    required: true,
    unique: true,
    default: newKey({ prefix: 'org', byteLength: 10 }),
  })
  orgId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  members: string[];


  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: true, default: () => new Date() })
  updatedAt: Date;

  @Prop({ required: true, default: () => new Date() })
  deletedAt: Date;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
