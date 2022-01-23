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

import { CreateBlogPostDTO } from 'src/dto/createBlogPost.dto';
import { EditBlogPostDTO } from 'src/dto/editBlogPost.dto';

@UseGuards(UsersGuard)
@Controller()
export class UsersBlogPostsController {
  constructor(private pService: BlogPostsService) {}

  //TBI tag
  @Post('users/blog-posts')
  async createPost(
    @Session() session: UserSession,
    @Body('post') createBlogPostDTO: CreateBlogPostDTO,
  ): Promise<void> {
    return this.pService.doCreatePost(session, createBlogPostDTO);
  }

  //TBI tag
  @Put('users/blog-posts')
  async editPost(
    @Session() session: UserSession,
    @Body('post') editBlogPostDTO: EditBlogPostDTO,
  ): Promise<void> {
    return this.pService.doEditPost(session, editBlogPostDTO);
  }

  @Delete('users/blog-posts/:id')
  async deletePost(
    @Session() session: UserSession,
    @Param('id') id: string,
  ): Promise<void> {
    return this.pService.doDeletePost(session, id);
  }
}
