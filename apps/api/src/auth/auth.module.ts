import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthLogSchema } from './schemas/log.schema';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'AuthLog', schema: AuthLogSchema }],
      'auth',
    ),
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, GoogleStrategy],
})
export class AuthModule {}
