import { Injectable } from '@nestjs/common';
import { WorkspaceDocument } from './schemas/workspace.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel('Workspace', 'space')
    private readonly workspaceModel: Model<WorkspaceDocument>,
  ) {}
  create(workspace: WorkspaceDocument) {
    return this.workspaceModel.create(workspace);
  }
  findAll(userId: string) {
    console.log('userId', userId);
    return this.workspaceModel.find({ userId: userId }).exec();
  }
  findById(id: string) {
    return this.workspaceModel.find({ workspaceId: id }).exec();
  }
}
