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
import { EmailModule } from './email/email.module';
// console.log(process.env);
@Module({
  imports: [
    WorkspaceModule,
    ChatModule,
    MessageModule,
    MongooseModule.forRoot(process.env.MONGODB_URI + 'auth', {
      connectionName: 'auth',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI + 'chat', {
      connectionName: 'chat',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI + 'chatbot', {
      connectionName: 'space',
    }),
    ChatbotModule,
    AuthModule,
    OrganisationModule,
    UserModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
