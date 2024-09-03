import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      // passReqToCallback: true,
      scope: ['profile', 'email'],
      access_type: 'offline',
      prompt: 'consent',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      console.log('Validating user...');
      console.log('Profile:', profile);
      if (!profile) {
        return done(new Error('Profile is undefined'), null);
      }
      const email = profile?.emails?.[0]?.value;
      if (!email) {
        return done(new Error('No email found'), null);
      }

      const firstName =
        profile?.name?.givenName || profile?.displayName?.split(' ')[0];
      const lastName =
        profile?.name?.familyName ||
        profile?.displayName?.split(' ').slice(1).join(' ');
      const picture = profile?.photos?.[0]?.value;
      const phone = profile?.phoneNumber;
      const userPayload = {
        email,
        emailConfirmedAt: new Date(),
        firstName,
        lastName,
        avatar: picture,
        accessToken,
        phone,
      };

      // await this.authService.createUser(userPayload);

      done(null, userPayload);
    } catch (error) {
      console.error('Error in validate method:', error);
      done(error, null);
    }
  }
}
