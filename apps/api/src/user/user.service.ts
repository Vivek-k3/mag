import { Injectable, ConflictException } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: any) {
    const { email } = createUserDto;
    const userData: any = this.userModel.findOne({ email });
    if (userData) {
      throw new ConflictException('user is already exist!');
    }
    const password = await bcrypt.hash(createUserDto.password, 10);
    const userId = uuidv4();
    const data = { ...createUserDto, password, userId };
    const createdUser = await this.userModel.create(data);
    return createdUser;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
