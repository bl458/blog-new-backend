import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 256 })
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
