import { Body, Controller, Post } from '@nestjs/common';

import { User } from 'src/db/entity/User';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private uService: UserService) {}

  @Post('user')
  async signup(
    @Body('email') email: string,
    @Body('pw') pw: string,
  ): Promise<User> {
    return await this.uService.createUser(email, pw);
  }
}
