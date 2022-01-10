import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { DBConnService } from 'src/db/db.conn.service';

import { Post } from 'src/db/entity/Post';

import { PostDTO } from 'src/dto/post.dto';

@Injectable()
export class PostService {
  constructor(private conn: DBConnService) {}

  async doGetPostPage(pageNo: number): Promise<Post[]> {
    return [];
  }

  async doEditPost(postDTO: PostDTO): Promise<void> {
    this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(Post, postDTO.id);
      await mgr.save({ ...post, ...instanceToPlain(postDTO) });
    });
  }

  async doDeletePost(id: string): Promise<void> {
    this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(Post, id);
      if (!post) {
        throw new BadRequestException('bad post id');
      }

      await mgr.remove(post);
    });
  }
}
