import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './board.service';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => String, { nullable: true })
  fetchBoards(): string {
    return this.boardsService.qqq();
  }
}
