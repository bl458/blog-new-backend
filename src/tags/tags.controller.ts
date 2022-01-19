import { Controller, Get, Param } from '@nestjs/common';

import { TagsService } from './tags.service';

import { Tag } from 'src/db/entity/Tag';

@Controller()
export class TagsController {
  constructor(private tService: TagsService) {}

  @Get('tags')
  async getAllTags(): Promise<Tag[]> {
    return this.tService.doGetAllTags();
  }

  @Get('tags/:keyword')
  async getKeywordTags(@Param('keyword') keyword: string): Promise<Tag[]> {
    return this.tService.searchTags(keyword);
  }
}
