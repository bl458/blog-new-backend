import { Controller, Get } from '@nestjs/common';

import { PostService } from './post.service';

import { Post } from 'src/db/entity/Post';

@Controller()
export class PostController {
  constructor(private pService: PostService) {}

  @Get('post')
  async getPostPage(): Promise<Post[]> {
    return [];
  }
}
