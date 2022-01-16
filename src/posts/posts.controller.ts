import { Controller, Get, Param } from '@nestjs/common';

import { PostsService } from './posts.service';

import { BlogPost } from 'src/db/entity/BlogPost';

@Controller()
export class PostsController {
  constructor(private pService: PostsService) {}

  @Get('posts/:page')
  async getPostPage(@Param('page') pageNo: number): Promise<BlogPost[]> {
    return this.pService.doGetPostPage(pageNo);
  }
}
