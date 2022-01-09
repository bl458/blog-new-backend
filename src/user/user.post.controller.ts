import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UserGuard } from './user.guard';

import { PostService } from '../post/post.service';

import { PostDTO } from 'src/dto/post.dto';

@UseGuards(UserGuard)
@Controller()
export class UserPostController {
  constructor(private pService: PostService) {}

  //TBI post's tag
  @Put('user/post')
  async editPost(@Body('post') postDTO: PostDTO): Promise<void> {
    return this.pService.doEditPost(postDTO);
  }

  @Delete('user/post/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.pService.doDeletePost(id);
  }
}
