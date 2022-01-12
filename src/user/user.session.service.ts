import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { DBConnService } from 'src/db/db.conn.service';

import { User } from 'src/db/entity/User';
import { UserSession } from 'src/db/entity/UserSession';

@Injectable()
export class UserSessionService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async doLogin(email: string, pw: string): Promise<string> {
    return this.conn.getConn().transaction(async (mgr) => {
      const user = await mgr.findOne(User, {
        select: ['id', 'pw'],
        where: { email },
      });
      if (!user) {
        throw new BadRequestException('email not exist');
      }

      if (!(await this.auth.comparePw(pw, user.pw))) {
        throw new BadRequestException('wrong pw');
      }

      const prevSession = await mgr.findOne(UserSession, {
        select: ['id'],
        where: { user },
      });
      if (prevSession) {
        await mgr.remove(prevSession);
      }

      const newSession = new UserSession();
      newSession.user = user;
      newSession.token = await this.auth.generateToken(); //TBI consider when dup token for different session objs
      await mgr.save(newSession);
      return newSession.token;
    });
  }

  async doLogout(token: string): Promise<void> {
    return this.conn.getConn().transaction(async (mgr) => {
      const session = await mgr.findOne(UserSession, {
        select: ['id'],
        where: { token },
      });
      if (!session) {
        throw new BadRequestException('token not exist');
      }

      await mgr.remove(session);
    });
  }
}
