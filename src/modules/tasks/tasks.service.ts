import { Task } from '@prisma/client';
import { v4 } from 'uuid';
import { prismaClient } from '../../common/libs/prisma';

export type TaskRequest = {
  listId: string;
  title: string;
  description?: string;
  completed?: boolean;
};

export class TasksService {
  async getTasks() {
    const tasks: Task[] = await prismaClient.task.findMany();
    return tasks;
  }

  async createTask({ title, description = '', listId }: TaskRequest): Promise<Task> {
    const id = v4();
    const task: Task = await prismaClient.task.create({ data: { id, title, description, completed: false, listId } });
    return task;
  }

  async getTask(id: string): Promise<Task> {
    const task: Task = await prismaClient.task.findFirstOrThrow({ where: { id } });
    return task;
  }

  async updateTask(id: string, { title, description = '', completed = false, listId }: TaskRequest): Promise<Task> {
    const task: Task = await prismaClient.task.update({
      data: { title, description, completed, listId },
      where: { id },
    });
    return task;
  }

  async deleteTask(id: string) {
    await prismaClient.task.delete({ where: { id } });
    return { deleted: true };
  }
}
