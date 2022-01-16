import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { UsersSessionService } from './users.session.service';

import { EmailPipe } from 'src/pipes/EmailPipe';
import { PasswordPipe } from 'src/pipes/PasswordPipe';
import { TokenPipe } from 'src/pipes/TokenPipe';

@Controller()
export class UsersSessionController {
  constructor(private uSService: UsersSessionService) {}

  @Post('users/sessions')
  async login(
    @Body('email', EmailPipe) email: string,
    @Body('pw', PasswordPipe) pw: string,
  ): Promise<string> {
    return this.uSService.doLogin(email, pw);
  }

  @Delete('users/sessions/:token')
  async logout(@Param('token', TokenPipe) token: string): Promise<void> {
    return this.uSService.doLogout(token);
  }
}
