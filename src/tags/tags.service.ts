import { Injectable } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';

import { Tag } from 'src/db/entity/Tag';

@Injectable()
export class TagsService {
  constructor(private conn: DBConnService) {}

  //TBI implement
  async doGetAllTags(): Promise<Tag[]> {
    return this.conn
      .getConn()
      .createQueryBuilder()
      .select('tag')
      .from(Tag, 'tag')
      .getMany();
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
