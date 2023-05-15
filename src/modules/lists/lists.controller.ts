import { List } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Security, Tags, Request } from 'tsoa';
import { ListRequest, createList, deleteList, getList, getLists, updateList } from './lists.service';

@Route('/lists')
@Tags('Lists')
export class ListsController extends Controller {
  @Security('jwt', ['lists:read'])
  @Get()
  async getLists(): Promise<List[]> {
    return getLists();
  }

  @Security('jwt', ['lists:read'])
  @Get('{id}')
  async getList(@Path() id: string): Promise<List> {
    return getList(id);
  }

  @Security('jwt', ['lists:write'])
  @Post()
  async createList(@Request() request: { user_id: string }, @Body() { title }: ListRequest): Promise<List> {
    const { user_id } = request;
    return createList(user_id, { title });
  }

  @Security('jwt', ['lists:write'])
  @Patch('{id}')
  async updateList(
    @Request() request: { user_id: string },
    @Path() id: string,
    @Body() { title }: ListRequest
  ): Promise<List> {
    const { user_id } = request;
    return updateList(user_id, id, { title });
  }

  @Security('jwt', ['lists:write'])
  @Delete('{id}')
  async deleteList(@Request() request: { user_id: string }, @Path() id: string): Promise<{ deleted: boolean }> {
    const { user_id } = request;
    return deleteList(user_id, id);
  }
}
