import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  pw: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  posts: Post[];
}
