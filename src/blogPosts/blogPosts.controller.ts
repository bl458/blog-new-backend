import { Controller, Get, Param } from '@nestjs/common';

import { BlogPostsService } from './blogPosts.service';

import { BlogPost } from 'src/db/entity/BlogPost';

import { IntegerPipe } from 'src/pipes/IntegerPipe';

@Controller()
export class BlogPostsController {
  constructor(private pService: BlogPostsService) {}

  @Get('blog-posts/:page')
  async getPostPage(
    @Param('page', new IntegerPipe({ min: 0 })) pageNo: number,
  ): Promise<BlogPost[]> {
    return this.pService.doGetPostPage(pageNo);
  }
}
