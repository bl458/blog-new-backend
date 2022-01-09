import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  pw: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  posts: Post[];
}
