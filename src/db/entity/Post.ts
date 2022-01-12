import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  titleSub: string;

  @Column({ nullable: false })
  content: string;

  @Index()
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @OneToMany(() => Tag, (tag) => tag.post)
  @JoinColumn()
  tags: Tag[];
}
