import { List } from '@prisma/client';
import { v4 } from 'uuid';
import logger from '../../common/libs/logger';
import { prismaClient } from '../../common/libs/prisma';

export type ListRequest = {
  title: string;
};

export const getLists = async () => {
  const lists: List[] = await prismaClient.list.findMany();
  return lists;
};

export const createList = async (userId: string, { title }: ListRequest): Promise<List> => {
  const id = v4();
  const list: List = await prismaClient.list.create({ data: { id, title, primary: false, userId } });
  return list;
};

export const getList = async (id: string): Promise<List> => {
  const list: List = await prismaClient.list.findFirstOrThrow({ where: { id } });
  return list;
};

export const updateList = async (userId: string, id: string, { title }: ListRequest): Promise<List> => {
  const list: List = await prismaClient.list.update({ data: { title }, where: { id, id_userId: { id, userId } } });
  return list;
};

export const deleteList = async (userId: string, id: string) => {
  logger.info(`Delete List ${id} for User ${userId}`);
  await prismaClient.list.delete({ where: { id, id_userId: { id, userId } } });
  return { deleted: true };
};
