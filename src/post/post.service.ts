import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { DBConnService } from 'src/db/db.conn.service';

import { Post } from 'src/db/entity/Post';

import { PostDTO } from 'src/dto/post.dto';

@Injectable()
export class PostService {
  static CACHE_DURATION = 86400000; //1 day
  static PAGE_SIZE = 5;

  constructor(private conn: DBConnService) {}

  async doGetPostPage(pageNo: number): Promise<Post[]> {
    return this.conn.getConn().transaction(async (mgr) => {
      const posts = await mgr
        .createQueryBuilder(Post, 'post')
        .select(['post.id', 'post.title', 'post.titleSub', 'post.content'])
        .orderBy('post.createdAt', 'DESC')
        .cache(PostService.CACHE_DURATION)
        .getMany();

      const pageStart = pageNo * PostService.PAGE_SIZE;
      const pageEnd = (pageNo + 1) * PostService.PAGE_SIZE;
      return posts.slice(pageStart, pageEnd);
    });
  }

  async doEditPost(postDTO: PostDTO): Promise<void> {
    this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(Post, postDTO.id);
      await mgr.save({ ...post, ...instanceToPlain(postDTO) });
    });
  }

  async doDeletePost(id: string): Promise<void> {
    this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(Post, { select: ['id'], where: { id } });
      if (!post) {
        throw new BadRequestException('bad post id');
      }

      await mgr.remove(post);
    });
  }
}
