import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToMany(() => Tag, (tag) => tag.blogPosts, {
    cascade: ['insert'],
    nullable: false,
  })
  @JoinTable()
  tags: Tag[];
}
