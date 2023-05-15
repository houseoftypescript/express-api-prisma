import { User } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Request, Route, Security, Tags } from 'tsoa';
import { UserRequest, UsersService } from './users.service';

@Tags('User')
@Route('/user')
export class UsersController extends Controller {
  private usersService: UsersService;

  constructor() {
    super();
    this.usersService = new UsersService();
  }

  @Security('jwt', ['users:read'])
  @Get()
  async getUser(@Request() request: { user_id: string }): Promise<Pick<User, 'id' | 'username'>> {
    const { user_id } = request;
    return this.usersService.getUser(user_id);
  }

  @Security('jwt', ['users:write'])
  @Patch('username')
  async updateEmail(
    @Request() request: { user_id: string },
    @Body() { email }: UserRequest
  ): Promise<Pick<User, 'id' | 'email' | 'username'>> {
    const { user_id } = request;
    return this.usersService.updateEmail(user_id, email);
  }

  @Security('jwt', ['users:write'])
  @Patch('username')
  async updateUsername(
    @Request() request: { user_id: string },
    @Body() { username }: UserRequest
  ): Promise<Pick<User, 'id' | 'username'>> {
    const { user_id } = request;
    return this.usersService.updateUsername(user_id, username);
  }

  @Security('jwt', ['users:write'])
  @Patch('password')
  async updatePassword(
    @Request() request: { user_id: string },
    @Body() { password }: UserRequest
  ): Promise<Pick<User, 'id' | 'username'>> {
    const { user_id } = request;
    return this.usersService.updatePassword(user_id, password);
  }

  @Security('jwt', ['users:write'])
  @Delete()
  async deleteUser(@Request() request: { user_id: string }): Promise<void> {
    const { user_id } = request;
    return this.usersService.deleteUser(user_id);
  }
}
