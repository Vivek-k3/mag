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
    @InjectModel('User', 'auth')
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: any) {
    const { email } = createUserDto;
    const userData = await this.userModel.findOne({ email });
    if (userData) {
      throw new ConflictException('User already exists!');
    }

    let data: any;

    if (createUserDto.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      data = { ...createUserDto, password: hashedPassword };
    } else {
      data = { ...createUserDto };
    }
    const createdUser = await this.userModel.create(data);
    return createdUser;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
