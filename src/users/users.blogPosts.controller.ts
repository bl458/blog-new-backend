import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersGuard } from './users.guard';

import { BlogPostsService } from '../blogPosts/blogPosts.service';

import { UserSession } from 'src/db/entity/UserSession';

import { CreateBlogPostDTO } from 'src/dto/createBlogPost.dto';
import { EditBlogPostDTO } from 'src/dto/editBlogPost.dto';

import { imageFileFilter } from 'src/helper/fileHelper';

@UseGuards(UsersGuard)
@Controller()
export class UsersBlogPostsController {
  constructor(private pService: BlogPostsService) {}

  @UseInterceptors(FileInterceptor('img', { fileFilter: imageFileFilter }))
  @Post('users/blog-posts')
  async createPost(
    @Session() session: UserSession,
    @Body('post') createBlogPostDTO: CreateBlogPostDTO,
    @UploadedFile() img: Express.Multer.File,
    @Req() req: any,
  ): Promise<void> {
    if (!img) {
      throw new BadRequestException('img is required');
    }
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    return this.pService.doCreatePost(session, createBlogPostDTO);
  }

  @Put('users/blog-posts')
  async editPost(
    @Body('post') editBlogPostDTO: EditBlogPostDTO,
  ): Promise<void> {
    return this.pService.doEditPost(editBlogPostDTO);
  }

  @Delete('users/blog-posts/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.pService.doDeletePost(id);
  }
}
