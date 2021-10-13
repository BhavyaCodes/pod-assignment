import { hash } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
// const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, plainPassword: string) {
    const alreadyExists = await this.userModel.findOne({ username });
    if (alreadyExists) {
      throw new BadRequestException(`${username} is already taken`);
    }
    try {
      const hashedPassword = await hash(plainPassword, 8);
      const newUser = new this.userModel({
        username,
        password: hashedPassword,
      });
      return newUser.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
