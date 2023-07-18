import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/google')
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    // 프로필을 받아온 다음, 로그인을 처리해야 하는 곳
    // 1. 회원조회
    let user = await this.usersService.findOne({ email: req.user.email });
    // 2. 회원가입이 안되어 있다면? 자동회원가입
    if (!user) {
      user = await this.usersService.create({
        ...req.user,
      });
    }
    // 3. 회원가입이 되어 있다면? 로그인(refresh, access token 브라우저에 전송)
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://127.0.0.1:5500/class/section11/11-06-google-login/frontend/login/index.html',
    );
    return 'test';
  }
}
