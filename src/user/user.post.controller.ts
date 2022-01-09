import {
  Body,
  Controller,
  Delete,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UserGuard } from './user.guard';

import { UserPostService } from './user.post.service';

import { UserSession } from 'src/db/entity/UserSession';

@UseGuards(UserGuard)
@Controller()
export class UserPostController {
  constructor(private uPService: UserPostService) {}

  //TBI post's tag
  @Put('user/post')
  async editPost(
    @Session() session: UserSession,
    @Body('post') postDTO,
  ): Promise<void> {
    return;
  }

  @Delete('user/post/:id')
  async deletePost(): Promise<void> {
    return;
  }
}
