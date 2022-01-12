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
@Index(['token', 'lastUsedAt'])
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  lastUsedAt: Date;

  @Column({ length: 256, unique: true })
  token: string;

  @Index()
  @OneToOne(() => User, (user) => user.session)
  @JoinColumn()
  user: User;
}
