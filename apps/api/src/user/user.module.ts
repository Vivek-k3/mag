import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AccountSchema } from './schemas/account.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }], 'auth'),
    MongooseModule.forFeature(
      [{ name: 'Account', schema: AccountSchema }],
      'auth',
    ),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
