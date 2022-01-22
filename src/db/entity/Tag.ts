import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BlogPost } from './BlogPost';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => BlogPost, (blogPost) => blogPost.tags)
  blogPosts: BlogPost[];
}
