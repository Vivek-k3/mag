import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuthModule } from './auth/auth.module';
import { OrganisationModule } from './organisation/organisation.module';
import { UserModule } from './user/user.module';
// console.log(process.env);
@Module({
  imports: [
    WorkspaceModule,
    ChatModule,
    MessageModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatbotModule,
    AuthModule,
    OrganisationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
