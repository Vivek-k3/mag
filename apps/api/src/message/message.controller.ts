import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  
  @Post('create')
  async create(@Body() createMessageDto: any) {
    return this.messageService.create(createMessageDto);
  }
  @Get('all')
  async findAll(@Query('userId') userId: string) {
    return this.messageService.findAll(userId);
  }
}
