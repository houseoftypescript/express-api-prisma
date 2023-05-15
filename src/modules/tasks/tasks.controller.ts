import { Task } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from 'tsoa';
import { TaskRequest, createTask, deleteTask, getTask, getTasks, updateTask } from './tasks.service';

@Route('/tasks')
@Tags('Tasks')
export class TasksController extends Controller {
  @Get()
  async getTasks(): Promise<Task[]> {
    return getTasks();
  }

  @Post()
  async createTask(@Body() { title, description, listId }: TaskRequest): Promise<Task> {
    return createTask({ title, description, listId });
  }

  @Get('{id}')
  async getTask(@Path() id: string): Promise<Task> {
    return getTask(id);
  }

  @Patch('{id}')
  async updateTask(@Path() id: string, @Body() { title, description, completed, listId }: TaskRequest): Promise<Task> {
    return updateTask(id, { title, description, completed, listId });
  }

  @Delete('{id}')
  async deleteTask(@Path() id: string): Promise<{ deleted: boolean }> {
    return deleteTask(id);
  }
}
