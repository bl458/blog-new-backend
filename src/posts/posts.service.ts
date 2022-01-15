import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToClass } from 'class-transformer';

import { DBConnService } from 'src/db/db.conn.service';

import { Post } from 'src/db/entity/Post';
import { UserSession } from 'src/db/entity/UserSession';

import { CreatePostDTO } from 'src/dto/createPost.dto';
import { EditPostDTO } from 'src/dto/editPost.dto';

@Injectable()
export class PostsService {
  static CACHE_DURATION = 86400000; //1 day
  static PAGE_SIZE = 5;

  constructor(private conn: DBConnService) {}

  async doGetPostPage(pageNo: number): Promise<Post[]> {
    return this.conn.getConn().transaction(async (mgr) => {
      const posts = await mgr
        .createQueryBuilder(Post, 'post')
        .select(['post.id', 'post.title', 'post.titleSub', 'post.content'])
        .orderBy('post.createdAt', 'DESC')
        .cache(PostsService.CACHE_DURATION)
        .getMany();

      const pageStart = pageNo * PostsService.PAGE_SIZE;
      const pageEnd = (pageNo + 1) * PostsService.PAGE_SIZE;
      return posts.slice(pageStart, pageEnd);
    });
  }

  async doCreatePost(
    session: UserSession,
    createPostDTO: CreatePostDTO,
  ): Promise<void> {
    return this.conn.getConn().transaction(async (mgr) => {
      const post = plainToClass(Post, instanceToPlain(createPostDTO));
      post.user = session.user;
      await mgr.save(post);
    });
  }

  async doEditPost(
    session: UserSession,
    editPostDTO: EditPostDTO,
  ): Promise<void> {
    return this.conn.getConn().transaction(async (mgr) => {
      let post = await mgr.findOne(Post, {
        select: ['id'],
        where: { id: editPostDTO.id, user: session.user },
      });

      if (!post) {
        throw new BadRequestException('no post id with this user');
      }

      post = Object.assign(post, instanceToPlain(editPostDTO));
      await mgr.save(post);
    });
  }

  async doDeletePost(session: UserSession, id: string): Promise<void> {
    return this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(Post, {
        select: ['id'],
        where: { id, user: session.user },
      });

      if (!post) {
        throw new BadRequestException('no post id with this user');
      }

      await mgr.remove(post);
    });
  }
}
