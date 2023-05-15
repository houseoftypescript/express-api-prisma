import { User } from '@prisma/client';
import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { AuthService, TokenRequest, TokenResponse } from './auth.service';

@Tags('Auth')
@Route('/auth')
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post('sign-up')
  async signUp(@Body() { email, username, password }: TokenRequest): Promise<Pick<User, 'id' | 'username'>> {
    return this.authService.signUp({ email, username, password });
  }

  @Post('sign-in')
  async signIn(@Body() { email, username, password }: TokenRequest): Promise<TokenResponse> {
    return this.authService.signIn({ email, username, password });
  }
}
