import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';

import { UserController } from './user.controller';
import { UserSessionController } from './user.session.controller';
import { UserPostController } from './user.post.controller';

import { UserService } from './user.service';
import { UserSessionService } from './user.session.service';
import { UserPostService } from './user.post.service';

@Module({
  imports: [AuthModule, DBModule],
  controllers: [UserController, UserSessionController, UserPostController],
  providers: [UserService, UserSessionService, UserPostService],
})
export class UserModule {}
