import { User } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Request, Route, Security, Tags } from 'tsoa';
import { UserRequest, deleteUser, getUser, updatePassword, updateUsername } from './users.service';

@Tags('User')
@Route('/user')
export class UsersController extends Controller {
  @Security('jwt', ['users:read'])
  @Get()
  async getUser(@Request() request: { user_id: string }): Promise<Pick<User, 'id' | 'username'>> {
    const { user_id } = request;
    return getUser(user_id);
  }

  @Security('jwt', ['users:write'])
  @Patch('username')
  async updateUsername(
    @Request() request: { user_id: string },
    @Body() { username }: UserRequest
  ): Promise<Pick<User, 'id' | 'username'>> {
    const { user_id } = request;
    return updateUsername(user_id, username);
  }

  @Security('jwt', ['users:write'])
  @Patch('password')
  async updatePassword(
    @Request() request: { user_id: string },
    @Body() { password }: UserRequest
  ): Promise<Pick<User, 'id' | 'username'>> {
    const { user_id } = request;
    return updatePassword(user_id, password);
  }

  @Security('jwt', ['users:write'])
  @Delete()
  async deleteUser(@Request() request: { user_id: string }): Promise<void> {
    const { user_id } = request;
    return deleteUser(user_id);
  }
}
