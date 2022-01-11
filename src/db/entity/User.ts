import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from './Post';
import { UserSession } from './UserSession';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  pw: string;

  @OneToOne(() => UserSession, (session) => session.user)
  session: UserSession;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
