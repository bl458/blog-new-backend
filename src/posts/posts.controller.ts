import { Controller, Get, Param } from '@nestjs/common';

import { PostsService } from './posts.service';

import { Post } from 'src/db/entity/Post';

@Controller()
export class PostsController {
  constructor(private pService: PostsService) {}

  @Get('posts/:page')
  async getPostPage(@Param('page') pageNo: number): Promise<Post[]> {
    return this.pService.doGetPostPage(pageNo);
  }
}
