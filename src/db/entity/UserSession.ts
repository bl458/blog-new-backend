import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
@Index(['token', 'createdAt'])
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Index()
  @Column({ length: 256, unique: true })
  token: string;

  @Index()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
