import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prismaClient } from '../../common/libs/prisma';

const SALT_OR_ROUNDS = 10;

export type UserRequest = {
  username: string;
  password: string;
};

export const updateUsername = async (id: string, username: string): Promise<Pick<User, 'id' | 'username'>> => {
  const user: Pick<User, 'id' | 'username'> = await prismaClient.user.update({
    data: { username },
    where: { id },
    select: { id: true, username: true },
  });
  return user;
};

export const updatePassword = async (id: string, password: string): Promise<Pick<User, 'id' | 'username'>> => {
  const hash: string = await bcrypt.hash(password, SALT_OR_ROUNDS);
  const user: Pick<User, 'id' | 'username'> = await prismaClient.user.update({
    data: { password: hash },
    where: { id },
    select: { id: true, username: true },
  });
  return user;
};

export const getUser = async (id: string): Promise<Pick<User, 'id' | 'username'>> => {
  const user: Pick<User, 'id' | 'username'> = await prismaClient.user.findFirstOrThrow({
    where: { id },
    select: { id: true, username: true },
  });
  return user;
};

export const deleteUser = async (id: string): Promise<void> => {
  await prismaClient.user.delete({ where: { id } });
};
