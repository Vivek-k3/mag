import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthLogSchema } from './schemas/log.schema';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { AccountSchema } from 'src/user/schemas/account.schema';
import { SessionSchema } from './schemas/session.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'AuthLog', schema: AuthLogSchema }],
      'auth',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }], 'auth'),
    MongooseModule.forFeature(
      [{ name: 'Account', schema: AccountSchema }],
      'auth',
    ),
    MongooseModule.forFeature(
      [{ name: 'Session', schema: SessionSchema }],
      'auth',
    ),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService],
})
export class AuthModule {}
