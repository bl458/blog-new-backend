import { Injectable } from '@nestjs/common';

import { Tag } from 'src/db/entity/Tag';

@Injectable()
export class TagsService {
  //TBI implement
  async doGetAllTags(): Promise<Tag[]> {
    return [];
  }

  //TBI implement
  async searchTags(keyword: string): Promise<Tag[]> {
    return [];
  }

  //TBI implement
  async doCreateTags(tagNames: string[]): Promise<Tag[]> {
    return [];
  }
}
