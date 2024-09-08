import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Req, UseGuards, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import * as cookieParser from 'cookie-parser';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const { user, query, headers } = req;
    const cookies = req.cookies;
    const sessionData = cookies['sessionData'];
    console.log('cookies', cookies);
    const user_agent = headers['user-agent'];
    const ip = headers['x-forwarded-for'] || headers['x-real-ip'];
    const code = query['code'];
    const scopes = query['scope'].split(' ');
    const hd = query['hd'];
    const email = user.emails[0].value;
    const firstName = user.name.givenName;
    const lastName = user.name.familyName;
    const avatar = user.photos[0].value;
    const provider_account_id = user.id;
    console.log(provider_account_id);
    const refresh_token = user.refreshToken;
    const access_token = user.accessToken;
    const id_token = user.idToken || '';
    const tokenInfo = await this.authService.getGoogleTokenInfo(access_token);
    const expires_in = tokenInfo.expires_in;
    const payload = {
      email,
      firstName,
      lastName,
      avatar,
      provider_account_id,
      refresh_token,
      access_token,
      expires_in,
      scopes,
      id_token,
      metadata: { ...user, hd },
      user_agent,
      ip,
      code,
    };
    const existingUserAndAccount =
      await this.userService.findByEmailAndProvider(email, 'google');

    let authResult: any;
    if (!existingUserAndAccount) {
      authResult = await this.authService.signUp('google', payload);
    } else {
      authResult = await this.authService.signIn('google', payload);
    }

    // Use the returned authResult to update the cookies
    if (authResult) {
      await this.authService.updateCookies(authResult, res);
    }

    res.redirect('http://localhost:3000/auth/google');
  }
}
