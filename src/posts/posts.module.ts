import { Module } from '@nestjs/common';

import { DBModule } from 'src/db/db.module';

import { PostsController } from './posts.controller';

import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [DBModule],
  exports: [PostsService],
})
export class PostsModule {}
