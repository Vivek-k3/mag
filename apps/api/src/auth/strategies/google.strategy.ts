import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      if (!profile) {
        return done(new Error('Profile is undefined'), null);
      }
      profile = { ...profile, accessToken, refreshToken };
      // console.log('refreshToken', profile);

      const email = profile?.emails?.[0]?.value as string;
      if (!email) {
        return done(new Error('No email found'), null);
      }
      // const tokenInfo = await this.authService.getGoogleTokenInfo(accessToken);
      // console.log('tokenInfo', tokenInfo);
      // const firstName =
      //   profile?.name?.givenName || profile?.displayName?.split(' ')[0];
      // const lastName =
      //   profile?.name?.familyName ||
      //   profile?.displayName?.split(' ').slice(1).join(' ');
      // const picture = profile?.photos?.[0]?.value;
      // const phone = profile?.phoneNumber;
      // const provider_account_id = profile?.id;
      // const userPayload = {
      //   email,
      //   emailConfirmedAt: new Date(),
      //   firstName,
      //   lastName,
      //   avatar: picture,
      //   phone,
      // };
      // let user;

      // user = await this.userService.findByEmail(email);
      // if (!user) {
      //   user = await this.authService.createUser(userPayload);
      // }

      // const accountsData = await this.userService.findAccountsByuserId(
      //   user?.userId,
      // );
      // for (let i = 0; i < accountsData.length; i++) {
      //   if (accountsData[i].provider === 'google') {
      //     await this.userService.updateAccountTokens({
      //       userId: user.userId,
      //       provider: 'google',
      //       access_token: tokenInfo.access_token || accessToken,
      //       refresh_token: refreshToken,
      //       expires_in: tokenInfo.expires_in,
      //       scopes: tokenInfo.scope.split(' '),
      //       last_signed_in_at: new Date(),
      //     });
      //     return done(null, profile);
      //   }
      // }

      // const accountPayload = {
      //   userId: user.userId,
      //   type: 'oauth',
      //   provider: 'google',
      //   provider_account_id,
      //   refresh_token: refreshToken,
      //   access_token: tokenInfo.access_token || accessToken,
      //   expires_in: tokenInfo.expires_in,
      //   scopes: tokenInfo.scope.split(' '),
      //   token_type: tokenInfo.token_type || 'Bearer',
      //   id_token: tokenInfo.id_token,
      //   metadata: profile,
      //   last_signed_in_at: new Date(),
      // };
      // console.log('accountPayload', accountPayload);
      // await this.authService.createAccount(accountPayload);

      done(null, profile);
    } catch (error) {
      console.error('Error in validate method:', error);
      done(error, null);
    }
  }
}
