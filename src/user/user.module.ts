import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';

import { UserController } from './user.controller';
import { UserSessionController } from './user.session.controller';
import { UserPostController } from './user.post.controller';

import { UserService } from './user.service';
import { UserSessionService } from './user.session.service';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [AuthModule, DBModule, PostService],
  controllers: [UserController, UserSessionController, UserPostController],
  providers: [UserService, UserSessionService],
})
export class UserModule {}
