import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from './Post';

export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(() => Post, (post) => post.tags)
  @JoinColumn()
  post: Post;
}
