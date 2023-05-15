import { User } from '@prisma/client';
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from 'tsoa';
import { UserRequest, deleteUser, getUser, signIn, signUp, updatePassword, updateUsername } from './users.service';

@Route('/users')
@Tags('Users')
export class UsersController extends Controller {
  @Post('sign-up')
  async signUp(@Body() { username, password }: UserRequest): Promise<User> {
    return signUp({ username, password });
  }

  @Post('sign-in')
  async signIn(@Body() { username, password }: UserRequest): Promise<User> {
    return signIn({ username, password });
  }

  @Get('{id}')
  async getUser(@Path() id: string): Promise<User> {
    return getUser(id);
  }

  @Delete('{id}')
  async deleteUser(@Path() id: string): Promise<{ deleted: boolean }> {
    return deleteUser(id);
  }

  @Patch('{id}/username')
  async updateUsername(@Path() id: string, @Body() { username }: UserRequest): Promise<User> {
    return updateUsername(id, username);
  }

  @Patch('{id}/password')
  async updatePassword(@Path() id: string, @Body() { password }: UserRequest): Promise<User> {
    return updatePassword(id, password);
  }
}
