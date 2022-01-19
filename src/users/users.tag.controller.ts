import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UsersGuard } from './users.guard';

import { TagsService } from '../tags/tags.service';

import { Tag } from 'src/db/entity/Tag';

@UseGuards(UsersGuard)
@Controller()
export class UsersTagsController {
  constructor(private tService: TagsService) {}

  @Post('users/tags')
  async createTags(@Body('tag-names') tagNames: string[]): Promise<Tag[]> {
    return this.tService.doCreateTags(tagNames);
  }
}
