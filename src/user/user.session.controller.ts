import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { UserSessionService } from './user.session.service';

@Controller()
export class UserSessionController {
  constructor(private uSService: UserSessionService) {}

  @Post('user/session')
  async login(
    @Body('email') email: string,
    @Body('pw') pw: string,
  ): Promise<string> {
    return this.uSService.doLogin(email, pw);
  }

  @Delete('user/session/:token')
  async logout(@Param('token') token: string): Promise<void> {
    return this.uSService.doLogout(token);
  }
}
