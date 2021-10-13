import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() body: SignupDto) {
    const { username, password } = body;
    const user = await this.usersService.createUser(username, password);

    return {
      message: 'signup successful',
      username: user.username,
    };
  }
}
