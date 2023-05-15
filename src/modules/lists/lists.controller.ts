import { List } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Request, Route, Security, Tags } from 'tsoa';
import { ListRequest, ListsService } from './lists.service';

@Tags('Lists')
@Route('/lists')
export class ListsController extends Controller {
  private listsService: ListsService;

  constructor() {
    super();
    this.listsService = new ListsService();
  }

  @Security('jwt', ['lists:read'])
  @Get()
  async getLists(): Promise<List[]> {
    return this.listsService.getLists();
  }

  @Security('jwt', ['lists:read'])
  @Get('{id}')
  async getList(@Path() id: string): Promise<List> {
    return this.listsService.getList(id);
  }

  @Security('jwt', ['lists:write'])
  @Post()
  async createList(@Request() request: { user_id: string }, @Body() { title }: ListRequest): Promise<List> {
    const { user_id } = request;
    return this.listsService.createList(user_id, { title });
  }

  @Security('jwt', ['lists:write'])
  @Patch('{id}')
  async updateList(
    @Request() request: { user_id: string },
    @Path() id: string,
    @Body() { title }: ListRequest
  ): Promise<List> {
    const { user_id } = request;
    return this.listsService.updateList(user_id, id, { title });
  }

  @Security('jwt', ['lists:write'])
  @Delete('{id}')
  async deleteList(@Request() request: { user_id: string }, @Path() id: string): Promise<void> {
    const { user_id } = request;
    return this.listsService.deleteList(user_id, id);
  }
}
