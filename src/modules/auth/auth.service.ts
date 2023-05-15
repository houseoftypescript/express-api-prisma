import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { JWT_SECRET, SALT_OR_ROUNDS } from '../../common/environments';
import { prismaClient } from '../../common/libs/prisma';

export type TokenRequest = { username: string; password: string };

export type TokenResponse = { token: string };

export class AuthService {
  async signIn({ username = '', password = '' }: TokenRequest): Promise<{ token: string }> {
    const user: User = await prismaClient.user.findFirstOrThrow({ where: { username } });
    const { id: user_id, password: hash } = user;
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) {
      const scopes = ['lists:read', 'lists:write', 'tasks:read', 'tasks:write', 'users:read', 'users:write'];
      const token: string = jwt.sign({ user_id, scopes }, JWT_SECRET);
      return { token };
    }
    throw new Error('Login Error');
  }

  async signUp({ username, password }: TokenRequest): Promise<Pick<User, 'id' | 'username'>> {
    const id: string = v4();
    const hash: string = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const user: Pick<User, 'id' | 'username'> = await prismaClient.user.create({
      data: { id, username, password: hash },
      select: { id: true, username: true },
    });
    const { id: userId } = user;
    const listId: string = v4();
    await prismaClient.list.create({ data: { id: listId, title: 'Tasks', userId, primary: true } });
    return user;
  }
}
