import { Injectable } from '@nestjs/common';
import { DBConnService } from 'src/db/db.conn.service';

import { User } from 'src/db/entity/User';

@Injectable()
export class UserService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async createUser(email: string, pw: string): Promise<User> {}
}
