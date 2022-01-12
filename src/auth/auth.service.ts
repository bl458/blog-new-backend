import { Injectable } from '@nestjs/common';

import { randomBytes, createHash } from 'crypto';
import { hash, compare } from 'bcrypt';

const TOKEN_BYTES = 128;
const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  async generateToken(): Promise<string> {
    return new Promise((resolve, reject) =>
      randomBytes(TOKEN_BYTES, (err, buf) =>
        err ? reject(err) : resolve(buf.toString('hex')),
      ),
    );
  }

  async hashPw(pw: string): Promise<string> {
    return new Promise((resolve, reject) =>
      hash(
        createHash('sha1').update(pw).digest('hex'),
        SALT_ROUNDS,
        (err, hash) => (err ? reject(err) : resolve(hash)),
      ),
    );
  }

  async comparePw(pw: string, hash: string): Promise<boolean> {
    return compare(createHash('sha1').update(pw).digest('hex'), hash);
  }
}
