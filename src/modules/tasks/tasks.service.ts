import { Task } from '@prisma/client';
import { v4 } from 'uuid';
import { prismaClient } from '../../common/libs/prisma';

export type TaskRequest = {
  listId: string;
  title: string;
  description?: string;
  completed?: boolean;
};

export const getTasks = async () => {
  const tasks: Task[] = await prismaClient.task.findMany();
  return tasks;
};

export const createTask = async ({ title, description = '', listId }: TaskRequest): Promise<Task> => {
  const id = v4();
  const task: Task = await prismaClient.task.create({ data: { id, title, description, completed: false, listId } });
  return task;
};

export const getTask = async (id: string): Promise<Task> => {
  const task: Task = await prismaClient.task.findFirstOrThrow({ where: { id } });
  return task;
};

export const updateTask = async (
  id: string,
  { title, description = '', completed = false, listId }: TaskRequest
): Promise<Task> => {
  const task: Task = await prismaClient.task.update({ data: { title, description, completed, listId }, where: { id } });
  return task;
};

export const deleteTask = async (id: string) => {
  await prismaClient.task.delete({ where: { id } });
  return { deleted: true };
};
