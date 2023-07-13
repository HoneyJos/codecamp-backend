import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/createUser.input';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';

import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create({ createUserInput });
  }

  @Query(() => [User])
  findUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchUser(@Context() context: IContext): string {
    console.log('============');
    console.log(context.req.user);
    console.log('============');
    return '인가에 성공하였습니다.';
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  updateUserPwd(
    @Args('password') password: string,
    @Context() conetxt: IContext,
  ) {
    console.log(conetxt.req.user);
    return 'test';
  }
}
