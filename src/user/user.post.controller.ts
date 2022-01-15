import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UserGuard } from './user.guard';

import { PostService } from '../post/post.service';

import { UserSession } from 'src/db/entity/UserSession';

import { CreatePostDTO } from 'src/dto/createPost.dto';
import { EditPostDTO } from 'src/dto/editPost.dto';

@UseGuards(UserGuard)
@Controller()
export class UserPostController {
  constructor(private pService: PostService) {}

  @Post('user/post')
  async createPost(
    @Session() session: UserSession,
    @Body('post') createPostDTO: CreatePostDTO,
  ): Promise<void> {
    return this.pService.doCreatePost(session, createPostDTO);
  }

  //TBI post's tag
  @Put('user/post')
  async editPost(
    @Session() session: UserSession,
    @Body('post') editPostDTO: EditPostDTO,
  ): Promise<void> {
    return this.pService.doEditPost(session, editPostDTO);
  }

  @Delete('user/post/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.pService.doDeletePost(id);
  }
}
