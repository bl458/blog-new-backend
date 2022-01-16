import { Injectable, BadRequestException } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';
import { AuthService } from 'src/auth/auth.service';

import { User } from 'src/db/entity/User';

@Injectable()
export class UsersService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async createUser(email: string, pw: string): Promise<User> {
    return await this.conn.getConn().transaction(async (mgr) => {
      const user = new User();
      user.email = email;
      user.pw = await this.auth.hashPw(pw);
      try {
        await mgr.save(user);
        return user;
      } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('email already exists');
        }

        throw err;
      }
    });
  }
}
