import { List } from '@prisma/client';
import { v4 } from 'uuid';
import { prismaClient } from '../../common/libs/prisma';

export type ListRequest = {
  title: string;
  userId: string;
};

export const getLists = async () => {
  const lists: List[] = await prismaClient.list.findMany();
  return lists;
};

export const createList = async ({ title, userId }: ListRequest): Promise<List> => {
  const id = v4();
  const list: List = await prismaClient.list.create({
    data: { id, title, primary: false, userId },
  });
  return list;
};

export const getList = async (id: string): Promise<List> => {
  const list: List = await prismaClient.list.findFirstOrThrow({
    where: { id },
  });
  return list;
};

export const updateList = async (id: string, { title, userId }: ListRequest): Promise<List> => {
  const list: List = await prismaClient.list.update({
    data: { title, userId },
    where: { id },
  });
  return list;
};

export const deleteList = async (id: string) => {
  await prismaClient.list.delete({ where: { id } });
  return { deleted: true };
};
