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
@Index(['id', 'user'])
export class BlogPost {
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

  @ManyToOne(() => User, (user) => user.blogPosts)
  @JoinColumn()
  user: User;

  @OneToMany(() => Tag, (tag) => tag.blogPost)
  @JoinColumn()
  tags: Tag[];
}
