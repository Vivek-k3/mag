import { Injectable, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthLog, AuthLogDocument } from './schemas/log.schema';
import { SessionDocument } from './schemas/session.schema';
import { Response } from 'express';
import { credentials } from './constants';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('AuthLog', 'auth')
    private readonly authLogModel: Model<AuthLogDocument>,
    @InjectModel('Session', 'auth')
    private readonly sessionModel: Model<SessionDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(provider, payload) {
    try {
      console.log(
        `Signing up user with email: ${payload.email} using provider: ${provider}`,
      );

      // Check if user already exists
      const existingUser = await this.userService.findByEmail(payload.email);
      let user: any;
      let account: any;
      let session: any;

      if (existingUser) {
        console.log(
          `User with email ${payload.email} already exists. Proceeding with existing user.`,
        );
        user = existingUser;
      } else {
        console.log(`Creating new user with email: ${payload.email}`);
        const userPayload = {
          email: payload.email,
          password: payload.password,
          email_confirmed_at: new Date(),
          last_sign_in_at: new Date(),
          providers: [provider],
          phone: payload.phone,
          firstName: payload.firstName,
          lastName: payload.lastName,
          avatar: payload.avatar,
        };

        try {
          user = await this.userService.create(userPayload);
          console.log(`User created successfully with ID: ${user.userId}`);
        } catch (error) {
          console.error(`Error creating user: ${error.message}`);
          throw new Error('User creation failed');
        }
      }

      // Create account
      const accountPayload = {
        userId: user.userId,
        provider,
        provider_account_id: payload.provider_account_id,
        refresh_token: payload.refresh_token,
        access_token: payload.access_token,
        expires_in: payload.expires_in,
        scopes: payload.scopes,
        id_token: payload.id_token,
        metadata: payload.metadata,
        last_sign_in_at: new Date(),
      };

      try {
        account = await this.userService.createAccount(accountPayload);
        console.log(`Account created successfully for user ID: ${user.userId}`);
      } catch (error) {
        console.error(`Error creating account: ${error.message}`);
        throw new Error('Account creation failed');
      }

      // Create session
      const sessionPayload = {
        userId: user.userId,
        email: user.email,
        ip: payload.ip,
        user_agent: payload.user_agent,
      };

      try {
        session = await this.createSession(sessionPayload);
        console.log(`Session created successfully for user ID: ${user.userId}`);
      } catch (error) {
        console.error(`Error creating session: ${error.message}`);
        throw new Error('Session creation failed');
      }

      return {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        sessionId: session._id,
        access_token: session.access_token,
        provider_access_token: account.access_token,
        provider_refresh_token: account.refresh_token,
      };
    } catch (error) {
      console.error(`Error in signUp process: ${error.message}`);
      throw new Error('SignUp process failed');
    }
  }

  async signIn(provider, payload) {
    const { userId, email, ip, user_agent } = payload;
    const user = await this.userService.findByEmail(email);

    if (user) {
      console.log(`User: ${user}`);
      console.log(`payload: ${JSON.stringify(payload)}`);
      const session = await this.createSession({
        userId: user?.userId,
        email: user?.email,
        ip,
        user_agent,
      });
      return {
        accessToken: this.jwtService.sign({ userId, email }),
        ...payload,
      };
    }
    return null;
  }

  async getGoogleTokenInfo(accessToken: string) {
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error fetching token info: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log('Token info:', data);
      return data; // Return data if needed
    } catch (error) {
      console.error('Error fetching token info:', error);
      throw error; // Optionally re-throw the error if you want it to propagate
    }
  }

  async createSession(payload: any) {
    try {
      console.log(`Creating session for user ID ${payload.userId}`);
      console.log(payload);
      const { userId, email, ip, user_agent } = payload;

      // Generate JWT access token
      const access_token = this.jwtService.sign({ userId, email });
      console.log(
        `Generated access token for user ID ${userId}: ${access_token}`,
      );

      // Create the session in the database
      const session = await this.sessionModel.create({
        userId,
        email,
        access_token,
        ip,
        user_agent,
        refreshed_at: new Date(),
      });

      // console.log(`Session created successfully for user ID ${userId}`);

      return session;
    } catch (error) {
      console.error(
        `Error creating session for user ID ${payload.userId}: ${error.message}`,
      );
      throw new Error('Session creation failed');
    }
  }

  async refreshSession(sessionId: string) {
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session) {
      throw new Error('Session not found');
    }
    const payload = { userId: session.userId, email: session.email };
    const access_token = this.jwtService.sign(payload);
    session.access_token = access_token;
    session.refreshed_at = new Date();
    await session.save();
    return session;
  }

  async updateCookies(payload: any, @Res() res: Response) {
    const {
      userId,
      email,
      firstName,
      lastName,
      avatar,
      sessionId,
      access_token,
      provider_access_token,
      provider_refresh_token,
    } = payload;

    const options = {
      secure: true,
      sameSite: 'lax' as const,
    };

    res.cookie(
      'userData',
      JSON.stringify({ userId, email, firstName, lastName, avatar }),
      options,
    );
    res.cookie('sessionData', JSON.stringify({ userId, sessionId }), options);
    res.cookie(
      'tokenData',
      JSON.stringify({
        userId,
        access_token,
        provider_access_token,
        provider_refresh_token,
      }),
      {
        ...options,
        httpOnly: true, // This option prevents the cookie from being accessed by JavaScript on the client side.
      },
    );
  }

  async createUser(userPayload) {
    return await this.userService.create(userPayload);
  }

  async createAccount(accountPayload) {
    return await this.userService.createAccount(accountPayload);
  }

  async logger(payload: any, ip: string, userAgent: string) {
    const log = {
      payload: payload,
      ip,
      userAgent,
    };
    await this.authLogModel.create(log);
  }
}
