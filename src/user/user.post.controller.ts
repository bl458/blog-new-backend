import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UserGuard } from './user.guard';

import { PostService } from '../post/post.service';

import { UserSession } from 'src/db/entity/UserSession';

import { PostDTO } from 'src/dto/post.dto';

@UseGuards(UserGuard)
@Controller()
export class UserPostController {
  constructor(private pService: PostService) {}

  //TBI post's tag
  @Put('user/post')
  async editPost(
    @Session() session: UserSession,
    @Body('post') postDTO: PostDTO,
  ): Promise<void> {
    return;
  }

  @Delete('user/post/:id')
  async deletePost(
    @Session() session: UserSession,
    @Param('id') id: string,
  ): Promise<void> {
    return;
  }
}
