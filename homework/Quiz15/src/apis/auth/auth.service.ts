import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRefreshToken,
  IAuthServiceRestoreAccessToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'zigbang is the best', expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, context }: IAuthServiceRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'zigbang is the worst', expiresIn: '2w' },
    );

    context.res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }
}
