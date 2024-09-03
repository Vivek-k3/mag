import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '1068495933323-rlkjir4cod6lt08f1c8uodaa6j2kcai1.apps.googleusercontent.com',
      clientSecret: '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',
      //   callbackURL: 'https://api.metaphy.ai/salescopilot/auth/google/callback',
      callbackURL: 'http://localhost:9000/auth/google/callback',
      // passReqToCallback: true,
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const email = profile?.emails?.[0]?.value;
    const firstName =
      profile?.name?.givenName || profile?.displayName?.split(' ')[0];
    const lastName =
      profile?.name?.familyName ||
      profile?.displayName?.split(' ').slice(1).join(' ');
    const picture = profile?.photos?.[0]?.value;

    if (!email) {
      return done(new Error('No email found'), null);
    }

    const user = {
      email,
      firstName,
      lastName,
      picture,
      accessToken,
    };

    done(null, user);
  }
}
