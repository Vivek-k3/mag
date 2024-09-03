import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create.workspace.dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('create')
  async create(@Body() createWorkspaceDto: any) {
    return this.workspaceService.create(createWorkspaceDto);
  }
  @Get('all')
  async findAll(@Query('userId') userId: string) {
    return this.workspaceService.findAll(userId);
  }
}
