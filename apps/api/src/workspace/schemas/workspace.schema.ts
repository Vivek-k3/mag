import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsOptional, IsString } from 'class-validator';
import { newId } from '@v1/id';
export type WorkspaceDocument = mongoose.HydratedDocument<Workspace>;

@Schema()
export class Workspace {
  @Prop({ required: true, default: "Default Workspace" })
  name: string;

  @Prop({
    required: true,
    unique: true,
    default: () => newId('workspace', 6)
  })
  workspaceId: string;

  @Prop({required: true})
  userId: string;

  // @Prop({ required: true })
  // slug: string;

  // @Prop({ required: true })
  // description: string;

  @Prop({ required: true, default: 'You' })
  owner: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop({ required: true, default: () => new Date() })
  updatedAt: Date;

  @Prop({  })
  deletedAt: Date;

  @Prop({ required: true, default: false })
  isPublic: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: true, default: false })
  isArchived: boolean;

  @Prop({ required: true, default: false })
  isStarred: boolean;

  @Prop({ required: true, default: false })
  isFavorite: boolean;

  @Prop({ required: true, default: false })
  isShared: boolean;
  

  @Prop({ required: true, default: [] })
  isSharedWith: string[];
  

}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);


