import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DBModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [AuthModule, UsersModule, DBModule, PostsModule, TagsModule],
})
export class AppModule {}
