import { Module } from '@nestjs/common';

import { DBModule } from 'src/db/db.module';

import { PostController } from './post.controller';

import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DBModule],
  exports: [PostService],
})
export class PostModule {}
