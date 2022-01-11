import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';
import { PostModule } from 'src/post/post.module';

import { UserController } from './user.controller';
import { UserSessionController } from './user.session.controller';
import { UserPostController } from './user.post.controller';

import { UserService } from './user.service';
import { UserSessionService } from './user.session.service';

@Module({
  controllers: [UserController, UserSessionController, UserPostController],
  providers: [UserService, UserSessionService],
  imports: [AuthModule, DBModule, PostModule],
})
export class UserModule {}
