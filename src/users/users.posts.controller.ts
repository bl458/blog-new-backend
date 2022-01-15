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

import { UsersGuard } from './users.guard';

import { PostsService } from '../posts/posts.service';

import { UserSession } from 'src/db/entity/UserSession';

import { CreatePostDTO } from 'src/dto/createPost.dto';
import { EditPostDTO } from 'src/dto/editPost.dto';

@UseGuards(UsersGuard)
@Controller()
export class UsersPostsController {
  constructor(private pService: PostsService) {}

  @Post('users/posts')
  async createPost(
    @Session() session: UserSession,
    @Body('post') createPostDTO: CreatePostDTO,
  ): Promise<void> {
    return this.pService.doCreatePost(session, createPostDTO);
  }

  //TBI post's tag
  @Put('users/posts')
  async editPost(
    @Session() session: UserSession,
    @Body('post') editPostDTO: EditPostDTO,
  ): Promise<void> {
    return this.pService.doEditPost(session, editPostDTO);
  }

  @Delete('users/posts/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.pService.doDeletePost(id);
  }
}
