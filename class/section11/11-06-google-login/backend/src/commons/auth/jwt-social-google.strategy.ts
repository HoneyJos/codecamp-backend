import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '',
      client_secret: '',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    // req.user = { name: '철수' } 이런식으로 들어가게 되고 이후 컨트롤러에서 사용 가능함.
    return {
      name: '철수',
      email: '...',
      hashedPassword: '1234',
      age: 18,
    };
  }
}
