import { Body, Controller, Post } from '@nestjs/common';

import { User } from 'src/db/entity/User';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private uService: UsersService) {}

  @Post('users')
  async signup(
    @Body('email') email: string,
    @Body('pw') pw: string,
  ): Promise<User> {
    return await this.uService.createUser(email, pw);
  }
}
