import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { UsersSessionService } from './users.session.service';

@Controller()
export class UsersSessionController {
  constructor(private uSService: UsersSessionService) {}

  @Post('users/sessions')
  async login(
    @Body('email') email: string,
    @Body('pw') pw: string,
  ): Promise<string> {
    return this.uSService.doLogin(email, pw);
  }

  @Delete('users/sessions/:token')
  async logout(@Param('token') token: string): Promise<void> {
    return this.uSService.doLogout(token);
  }
}
