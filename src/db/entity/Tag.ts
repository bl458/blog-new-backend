import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.tags)
  @JoinColumn()
  blogPost: BlogPost;
}
