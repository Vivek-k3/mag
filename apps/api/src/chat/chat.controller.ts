import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Post('create')
  async create(@Body() createChatDto: any) {
    return this.chatService.create(createChatDto);
  }
  @Get('all')
  async findAll(@Query('userId') userId: string) {
    return this.chatService.findAll(userId);
  }
}
