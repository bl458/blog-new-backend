import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MoreThan } from 'typeorm';

import { DBConnService } from 'src/db/db.conn.service';

import { UserSession } from 'src/db/entity/UserSession';

@Injectable()
export class UserGuard implements CanActivate {
  static TOKEN_EXPIRY = 180000; // 30 min

  constructor(private conn: DBConnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToHttp().getRequest().header('api-token');
    const session = await this.conn.getConn().transaction(async (mgr) => {
      const now = Date.now();
      const session = await mgr.findOne(UserSession, {
        select: ['id', 'user'],
        where: {
          token,
          lastUsedAt: MoreThan(new Date(now - UserGuard.TOKEN_EXPIRY)),
        },
        relations: ['user'],
      });

      session.lastUsedAt = new Date(now);
      return session;
    });

    if (!session) {
      return false;
    }

    context.switchToHttp().getRequest().session = session;
    return true;
  }
}
