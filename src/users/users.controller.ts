import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';

import { User } from 'src/db/entity/User';

import { EmailPipe } from 'src/pipes/EmailPipe';
import { PasswordPipe } from 'src/pipes/PasswordPipe';

@Controller()
export class UsersController {
  constructor(private uService: UsersService) {}

  @Post('users')
  async signup(
    @Body('email', EmailPipe) email: string,
    @Body('pw', PasswordPipe) pw: string,
  ): Promise<User> {
    return await this.uService.createUser(email, pw);
  }
}
