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

import { BlogPostsService } from '../blogPosts/blogPosts.service';

import { UserSession } from 'src/db/entity/UserSession';

import { CreatePostDTO } from 'src/dto/createPost.dto';
import { EditPostDTO } from 'src/dto/editPost.dto';

@UseGuards(UsersGuard)
@Controller()
export class UsersBlogPostsController {
  constructor(private pService: BlogPostsService) {}

  //TBI tag
  @Post('users/blog-posts')
  async createPost(
    @Session() session: UserSession,
    @Body('post') createPostDTO: CreatePostDTO,
  ): Promise<void> {
    return this.pService.doCreatePost(session, createPostDTO);
  }

  //TBI tag
  @Put('users/blog-posts')
  async editPost(
    @Session() session: UserSession,
    @Body('post') editPostDTO: EditPostDTO,
  ): Promise<void> {
    return this.pService.doEditPost(session, editPostDTO);
  }

  @Delete('users/blog-posts/:id')
  async deletePost(
    @Session() session: UserSession,
    @Param('id') id: string,
  ): Promise<void> {
    return this.pService.doDeletePost(session, id);
  }
}
