import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from './Post';

@Entity()
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
