import { Controller, Get, Param } from '@nestjs/common';

import { PostService } from './post.service';

import { Post } from 'src/db/entity/Post';

@Controller()
export class PostController {
  constructor(private pService: PostService) {}

  @Get('post/:page')
  async getPostPage(@Param('page') pageNo: number): Promise<Post[]> {
    return this.pService.doGetPostPage(pageNo);
  }
}
