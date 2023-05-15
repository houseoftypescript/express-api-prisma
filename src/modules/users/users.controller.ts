import { User } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Request, Route, Security, Tags } from 'tsoa';
import { UserRequest, deleteUser, getUser, signIn, signUp, updatePassword, updateUsername } from './users.service';

@Route('/user')
@Tags('User')
export class UsersController extends Controller {
  @Post('sign-up')
  async signUp(@Body() { username, password }: UserRequest): Promise<User> {
    return signUp({ username, password });
  }

  @Post('sign-in')
  async signIn(@Body() { username, password }: UserRequest): Promise<{ token: string }> {
    return signIn({ username, password });
  }

  @Security('jwt', ['users:read'])
  @Get()
  async getUser(@Request() request: { user_id: string }): Promise<User> {
    const { user_id } = request;
    return getUser(user_id);
  }

  @Security('jwt', ['users:write'])
  @Delete()
  async deleteUser(@Request() request: { user_id: string }): Promise<{ deleted: boolean }> {
    const { user_id } = request;
    return deleteUser(user_id);
  }

  @Security('jwt', ['users:write'])
  @Patch('username')
  async updateUsername(@Request() request: { user_id: string }, @Body() { username }: UserRequest): Promise<User> {
    const { user_id } = request;
    return updateUsername(user_id, username);
  }

  @Security('jwt', ['users:write'])
  @Patch('password')
  async updatePassword(@Request() request: { user_id: string }, @Body() { password }: UserRequest): Promise<User> {
    const { user_id } = request;
    return updatePassword(user_id, password);
  }
}
