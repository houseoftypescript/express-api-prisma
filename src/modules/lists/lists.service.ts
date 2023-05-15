import { List } from '@prisma/client';
import { v4 } from 'uuid';
import { prismaClient } from '../../common/libs/prisma';

export type ListRequest = {
  title: string;
};

export class ListsService {
  async getLists() {
    const lists: List[] = await prismaClient.list.findMany();
    return lists;
  }

  async createList(userId: string, { title }: ListRequest): Promise<List> {
    const id = v4();
    const list: List = await prismaClient.list.create({ data: { id, title, primary: false, userId } });
    return list;
  }

  async getList(id: string): Promise<List> {
    const list: List = await prismaClient.list.findFirstOrThrow({ where: { id } });
    return list;
  }

  async updateList(userId: string, id: string, { title }: ListRequest): Promise<List> {
    const list: List = await prismaClient.list.update({ data: { title }, where: { id, id_userId: { id, userId } } });
    return list;
  }

  async deleteList(userId: string, id: string): Promise<void> {
    await prismaClient.list.delete({ where: { id, id_userId: { id, userId } } });
  }
}
