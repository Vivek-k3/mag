import { Injectable, ConflictException } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { AccountDocument } from './schemas/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User', 'auth')
    private readonly userModel: Model<UserDocument>,
    @InjectModel('Account', 'auth')
    private readonly accountModel: Model<AccountDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: any) {
    const { email } = createUserDto;
    const userData = await this.userModel.findOne({ email });
    // if (userData) {
    //   throw new ConflictException('User already exists!');
    // }

    let data: any;

    if (createUserDto.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      data = { ...createUserDto, password: hashedPassword };
    } else {
      data = { ...createUserDto };
    }
    console.log('data', data);
    const createdUser = await this.userModel.create(data);
    return createdUser;
  }

  async createAccount(createAccountDto: any) {
    const data = createAccountDto;

    const createdAccount = await this.accountModel.create(data);
    return createdAccount;
  }

  async updateAccountTokens(tokenPayload: any) {
    const { userId, ...updateFields } = tokenPayload;
    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    );

    await this.accountModel.updateOne(
      { userId },
      { $set: filteredUpdateFields },
    );
  }

  async findByUserId(userId: string) {
    const user = await this.userModel.findOne({ userId });
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
  async findByEmailAndProvider(email: string, provider: string) {
    const user = await this.userModel.findOne({
      email,
      providers: provider,
    });
    return user;
  }
  async findAccountsByuserId(userId: string) {
    const account = await this.accountModel.find({ userId });
    return account;
  }
}
