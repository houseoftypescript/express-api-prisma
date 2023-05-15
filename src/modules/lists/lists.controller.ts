import { List } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from 'tsoa';
import { ListRequest, createList, deleteList, getList, getLists, updateList } from './lists.service';

@Route('/lists')
@Tags('Lists')
export class ListsController extends Controller {
  @Get()
  async getLists(): Promise<List[]> {
    return getLists();
  }

  @Post()
  async createList(@Body() { title, userId }: ListRequest): Promise<List> {
    return createList({ title, userId });
  }

  @Get('{id}')
  async getList(@Path() id: string): Promise<List> {
    return getList(id);
  }

  @Patch('{id}')
  async updateList(@Path() id: string, @Body() { title, userId }: ListRequest): Promise<List> {
    return updateList(id, { title, userId });
  }

  @Delete('{id}')
  async deleteList(@Path() id: string): Promise<{ deleted: boolean }> {
    return deleteList(id);
  }
}
