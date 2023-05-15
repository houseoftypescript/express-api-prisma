import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { prismaClient } from '../../common/libs/prisma';

const SALT_OR_ROUNDS = 10;

export type UserRequest = {
  username: string;
  password: string;
};

export const getUser = async (id: string): Promise<User> => {
  const user: User = await prismaClient.user.findFirstOrThrow({ where: { id } });
  return user;
};

export const signIn = async ({ username = '', password = '' }: UserRequest): Promise<User> => {
  const user: User = await prismaClient.user.findFirstOrThrow({ where: { username } });
  const { password: hash } = user;
  const isMatch = await bcrypt.compare(password, hash);
  if (isMatch) return user;
  throw new Error('Login Error');
};

export const signUp = async ({ username, password }: UserRequest): Promise<User> => {
  const id: string = v4();
  const hash: string = await bcrypt.hash(password, SALT_OR_ROUNDS);
  const user: User = await prismaClient.user.create({ data: { id, username, password: hash } });
  const { id: userId } = user;
  const listId: string = v4();
  await prismaClient.list.create({ data: { id: listId, title: 'Tasks', userId, primary: true } });
  return user;
};

export const updateUsername = async (id: string, username: string): Promise<User> => {
  const user: User = await prismaClient.user.update({ data: { username }, where: { id } });
  return user;
};

export const updatePassword = async (id: string, password: string): Promise<User> => {
  const hash: string = await bcrypt.hash(password, SALT_OR_ROUNDS);
  const user: User = await prismaClient.user.update({ data: { password: hash }, where: { id } });
  return user;
};

export const deleteUser = async (id: string) => {
  await prismaClient.user.delete({ where: { id } });
  return { deleted: true };
};
