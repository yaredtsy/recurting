import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '543240628970-aq1grv15u3btcrsfenmvbu3jhhbbm12o.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://recurting-production.up.railway.app/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      username: name.givenName,
    };
    if (emails[0].verified) done(null, user);
    else done('Email not verified', null);
  }
}
