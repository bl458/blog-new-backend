import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  title: string;

  @Column()
  titleSub: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @OneToMany(() => Tag, (tag) => tag.post)
  @JoinColumn()
  tags: Tag[];
}
