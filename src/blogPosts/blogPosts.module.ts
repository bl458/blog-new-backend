import { Module } from '@nestjs/common';

import { BlogPostsController } from './blogPosts.controller';

import { BlogPostsService } from './blogPosts.service';

@Module({
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
  exports: [BlogPostsService],
})
export class BlogPostsModule {}
