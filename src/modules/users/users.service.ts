import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../common/libs/prisma';

const SALT_OR_ROUNDS = 10;

export type UserRequest = { email: string; username: string; password: string };

export type UserResponse = Pick<User, 'id' | 'email' | 'username'>;

export class UsersService {
  async updateEmail(id: string, email: string): Promise<UserResponse> {
    const select = { id: true, email: true, username: true };
    const user: UserResponse = await prismaClient.user.update({
      data: { email },
      where: { id },
      select,
    });
    return user;
  }

  async updateUsername(id: string, username: string): Promise<UserResponse> {
    const select = { id: true, email: true, username: true };
    const user: UserResponse = await prismaClient.user.update({
      data: { username },
      where: { id },
      select,
    });
    return user;
  }

  async updatePassword(id: string, password: string): Promise<UserResponse> {
    const hash: string = await bcrypt.hash(password, SALT_OR_ROUNDS);
    const select = { id: true, email: true, username: true };

    const user: UserResponse = await prismaClient.user.update({
      data: { password: hash },
      where: { id },
      select,
    });
    return user;
  }

  async getUser(id: string): Promise<Pick<User, 'id' | 'username'>> {
    const select = { id: true, email: true, username: true };
    const user: Pick<User, 'id' | 'username'> = await prismaClient.user.findFirstOrThrow({
      where: { id },
      select,
    });
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await prismaClient.user.delete({ where: { id } });
  }
}
