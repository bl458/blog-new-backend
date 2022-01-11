import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Index()
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  pw: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  posts: Post[];
}
