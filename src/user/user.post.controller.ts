import { Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';

import { UserGuard } from './user.guard';

@UseGuards(UserGuard)
@Controller()
export class UserPostController {
  constructor(private uPService: UserPostService) {}

  @Put('user/post')
  async editPost() {}

  @Delete('user/post/:id')
  async deletePost() {}
}
