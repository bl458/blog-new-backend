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

import { CreatePostDTO } from 'src/dto/createPost.dto';

import { UserSession } from 'src/db/entity/UserSession';

@UseGuards(UserGuard)
@Controller()
export class UserPostController {
  constructor(private pService: PostService) {}

  @Post('user/post')
  async createPost(
    @Session() session: UserSession,
    postDTO: CreatePostDTO,
  ): Promise<void> {}

  //TBI post's tag
  @Put('user/post')
  async editPost(@Body('post') postDTO: PostDTO): Promise<void> {
    return this.pService.doEditPost(session, postDTO);
  }

  @Delete('user/post/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.pService.doDeletePost(id);
  }
}
