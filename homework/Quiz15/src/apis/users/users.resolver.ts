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
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchUser(@Context() context: IContext): Promise<User> {
    const loginUser = context.req.user.id;
    return this.usersService.findMyProfile({ loginUser });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  updateUserPassword(
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const loginUser = context.req.user.id;
    return this.usersService.updatePassword({ loginUser, password });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteUser(@Context() context: IContext) {
    const loginUser = context.req.user.id;
    return this.usersService.deleteMyProfile({ loginUser });
  }
}
