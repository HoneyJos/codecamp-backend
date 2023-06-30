import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee, StarbucksService } from './starbucks.service';
import { CreateStarbucksInput } from './dto/create-starbucks-input';
import { Starbucks } from './entities/starbucks.entity';

interface ICoffee {
  icoffee: Coffee;
}

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarbucksService) {}

  @Query(() => [Starbucks], { nullable: true })
  fetchStarbucks(): Coffee[] {
    return this.starbucksService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ): string {
    return this.starbucksService.createCoffee({ createStarbucksInput });
  }
}
