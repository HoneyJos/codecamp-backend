import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import {KakaoStrategy} from 'passport-kakao'
// import {NaverStrategy} from 'passport-naver'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization;
      //   const accessToken = temp.toLowercase().replace('bearer ', '');
      //   return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: fasdfsdaf(유저ID)}

    return {
      id: payload.sub,
    };
  }
}