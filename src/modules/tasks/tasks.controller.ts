import { Task } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Security, Tags } from 'tsoa';
import { TaskRequest, TasksService } from './tasks.service';

@Route('/tasks')
@Tags('Tasks')
export class TasksController extends Controller {
  private tasksService: TasksService;

  constructor() {
    super();
    this.tasksService = new TasksService();
  }

  @Security('jwt', ['tasks:read'])
  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Security('jwt', ['tasks:write'])
  @Post()
  async createTask(@Body() { title, description, listId }: TaskRequest): Promise<Task> {
    return this.tasksService.createTask({ title, description, listId });
  }

  @Security('jwt', ['tasks:read'])
  @Get('{id}')
  async getTask(@Path() id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }

  @Security('jwt', ['tasks:write'])
  @Patch('{id}')
  async updateTask(@Path() id: string, @Body() { title, description, completed, listId }: TaskRequest): Promise<Task> {
    return this.tasksService.updateTask(id, { title, description, completed, listId });
  }

  @Security('jwt', ['tasks:write'])
  @Delete('{id}')
  async deleteTask(@Path() id: string): Promise<{ deleted: boolean }> {
    return this.tasksService.deleteTask(id);
  }
}
