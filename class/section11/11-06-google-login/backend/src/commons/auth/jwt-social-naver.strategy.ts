import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/login/naver',
      // scope: ['email', 'profile'],
    });
  }
  validate(accessToken, refreshToken, profile, email) {
    console.log(profile);
    console.log(email);
    return {
      name: 'test',
    };
  }
}
