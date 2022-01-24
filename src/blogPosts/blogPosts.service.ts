import { BadRequestException, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToClass } from 'class-transformer';

import { DBConnService } from 'src/db/db.conn.service';

import { BlogPost } from 'src/db/entity/BlogPost';
import { Tag } from 'src/db/entity/Tag';
import { UserSession } from 'src/db/entity/UserSession';

import { CreateBlogPostDTO } from 'src/dto/createBlogPost.dto';
import { EditBlogPostDTO } from 'src/dto/editBlogPost.dto';

//TBI refactor repeated tag-related ops into private helpers
@Injectable()
export class BlogPostsService {
  static CACHE_DURATION = 86400000; //1 day
  static PAGE_SIZE = 5;

  constructor(private conn: DBConnService) {}

  async doGetPostPage(pageNo: number): Promise<BlogPost[]> {
    return this.conn.getConn().transaction(async (mgr) => {
      const posts = await mgr
        .createQueryBuilder(BlogPost, 'blogPost')
        .select([
          'blogPost.id',
          'blogPost.title',
          'blogPost.titleSub',
          'blogPost.content',
        ])
        .orderBy('blogPost.createdAt', 'DESC')
        .cache('post_cache', BlogPostsService.CACHE_DURATION)
        .getMany();

      const pageStart = pageNo * BlogPostsService.PAGE_SIZE;
      const pageEnd = (pageNo + 1) * BlogPostsService.PAGE_SIZE;
      //TBI use skip() in querybuilder instead of slice()
      return posts.slice(pageStart, pageEnd);
    });
  }

  async doCreatePost(
    session: UserSession,
    createBlogPostDTO: CreateBlogPostDTO,
  ): Promise<void> {
    await this.conn.getConn().queryResultCache.remove(['post_cache']);
    return this.conn.getConn().transaction(async (mgr) => {
      const post = plainToClass(BlogPost, instanceToPlain(createBlogPostDTO));
      post.user = session.user;
      for (const tagName of new Set(createBlogPostDTO.tags)) {
        let tag = await mgr.findOne(Tag, {
          select: ['id'],
          where: { name: tagName },
        });

        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
          // No need to save() b/c cascade
          // await mgr.save(tag);
        }

        post.tags.push(tag);
      }

      await mgr.save(post);
    });
  }

  async doEditPost(editBlogPostDTO: EditBlogPostDTO): Promise<void> {
    await this.conn.getConn().queryResultCache.remove(['post_cache']);
    return this.conn.getConn().transaction(async (mgr) => {
      let post = await mgr.findOne(BlogPost, {
        select: ['id'],
        where: { id: editBlogPostDTO.id },
        relations: ['tags', 'tags.blogPosts'],
      });

      if (!post) {
        throw new BadRequestException('no post id with this user');
      }

      const newTagNames = new Set(editBlogPostDTO.tags);
      post = Object.assign(
        post,
        instanceToPlain(editBlogPostDTO, { excludePrefixes: ['tags'] }),
      );
      if (newTagNames.size > 0) {
        for (const tag of post.tags) {
          if (!newTagNames.has(tag.name) && tag.blogPosts.length == 1) {
            await mgr.remove(tag);
          }
        }

        post.tags = [];
        for (const tagName of newTagNames) {
          let tag = await mgr.findOne(Tag, {
            select: ['id'],
            where: { name: tagName },
          });

          if (!tag) {
            tag = new Tag();
            tag.name = tagName;
          }

          post.tags.push(tag);
        }
      }

      await mgr.save(post);
    });
  }

  async doDeletePost(id: string): Promise<void> {
    await this.conn.getConn().queryResultCache.remove(['post_cache']);
    return this.conn.getConn().transaction(async (mgr) => {
      const post = await mgr.findOne(BlogPost, {
        select: ['id'],
        where: { id },
        relations: ['tags', 'tags.blogPosts'],
      });

      if (!post) {
        throw new BadRequestException('no post id with this user');
      }

      for (const tag of post.tags) {
        if (tag.blogPosts.length == 1) {
          await mgr.remove(tag);
        }
      }

      await mgr.remove(post);
    });
  }
}
