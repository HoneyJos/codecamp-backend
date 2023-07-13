import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UsersModule, //
    JwtModule.register({}),
  ],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
