import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthLog, AuthLogDocument } from './schemas/log.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('AuthLog')
    private readonly authLogModel: Model<AuthLogDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    
  ) {}
  
  async login(email:string): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const payload = { userId: user?.userId, email: user?.email };
      console.log(`User: ${user}`);
      console.log(`payload: ${JSON.stringify(payload)}`);
      return {
        accessToken: this.jwtService.sign(payload),
        ...payload,
      };
    }
    return null;
  }

  async googleLogin(email: any): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const payload = { userId: user?.id, email: user?.email };
      console.log(`User: ${user}`);
      console.log(`payload: ${JSON.stringify(payload)}`);
      return {
        accessToken: this.jwtService.sign(payload),
        ...payload,
      };
    }
    return null;
  }
  
  
  
  async logger (payload: any, ip: string, userAgent: string) {
    const log = {
      payload: payload,
      ip,
      userAgent
    };
    await this.authLogModel.create(log);
  }
}
