import { Controller, Get, Param } from '@nestjs/common';

import { PostsService } from './posts.service';

import { BlogPost } from 'src/db/entity/BlogPost';

import { IntegerPipe } from 'src/pipes/IntegerPipe';

@Controller()
export class PostsController {
  constructor(private pService: PostsService) {}

  @Get('posts/:page')
  async getPostPage(
    @Param('page', new IntegerPipe({ min: 0 })) pageNo: number,
  ): Promise<BlogPost[]> {
    return this.pService.doGetPostPage(pageNo);
  }
}
