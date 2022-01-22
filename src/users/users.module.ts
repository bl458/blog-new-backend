import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { BlogPostsModule } from 'src/blogPosts/blogPosts.module';

import { UsersController } from './users.controller';
import { UsersSessionController } from './users.session.controller';
import { UsersBlogPostsController } from './users.blogPosts.controller';

import { UsersService } from './users.service';
import { UsersSessionService } from './users.session.service';

@Module({
  controllers: [
    UsersController,
    UsersSessionController,
    UsersBlogPostsController,
  ],
  providers: [UsersService, UsersSessionService],
  imports: [AuthModule, BlogPostsModule],
})
export class UsersModule {}
