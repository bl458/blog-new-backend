import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DBModule } from './db/db.module';
import { BlogPostsModule } from './blogPosts/blogPosts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [AuthModule, UsersModule, DBModule, BlogPostsModule, TagsModule],
})
export class AppModule {}
