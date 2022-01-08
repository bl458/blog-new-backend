import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DBModule } from './db/db.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, UserModule, DBModule, PostModule],
})
export class AppModule {}
