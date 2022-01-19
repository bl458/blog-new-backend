import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';
import { PostsModule } from 'src/posts/posts.module';
import { TagsModule } from 'src/tags/tags.module';

import { UsersController } from './users.controller';
import { UsersSessionController } from './users.session.controller';
import { UsersPostsController } from './users.posts.controller';

import { UsersService } from './users.service';
import { UsersSessionService } from './users.session.service';

@Module({
  controllers: [UsersController, UsersSessionController, UsersPostsController],
  providers: [UsersService, UsersSessionService],
  imports: [AuthModule, DBModule, PostsModule, TagsModule],
})
export class UsersModule {}
