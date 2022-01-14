import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { DBConnService } from 'src/db/db.conn.service';

import { Post } from 'src/db/entity/Post';
import { UserSession } from 'src/db/entity/UserSession';

import { CreatePostDTO } from 'src/dto/createPost.dto';
import { EditPostDTO } from 'src/dto/editPost.dto';

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

  async doEditPost(session: UserSession, postDTO: PostDTO): Promise<void> {
    return this.conn.getConn().transaction(async (mgr) => {
      let post = await mgr.findOne(Post, {
        select: ['id'],
        where: { id: postDTO.id },
      });
      if (!post) {
        if (postDTO.id != undefined) {
          throw new BadRequestException('bad post id');
        }

        post = new Post();
        post.user = session.user;
      }

      post = Object.assign(post, instanceToPlain(postDTO));
      await mgr.save(post);
    });
  }

  async doDeletePost(id: string): Promise<void> {
    return this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(Post, { select: ['id'], where: { id } });
      if (!post) {
        throw new BadRequestException('bad post id');
      }

      await mgr.remove(post);
    });
  }
}
