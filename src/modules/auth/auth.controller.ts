import { User } from '@prisma/client';
import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { UserRequest } from '../users/users.service';
import { AuthService, TokenResponse } from './auth.service';

@Tags('Auth')
@Route('/auth')
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post('sign-up')
  async signUp(@Body() { username, password }: UserRequest): Promise<Pick<User, 'id' | 'username'>> {
    return this.authService.signUp({ username, password });
  }

  @Post('sign-in')
  async signIn(@Body() { username, password }: UserRequest): Promise<TokenResponse> {
    return this.authService.signIn({ username, password });
  }
}
