import { Module } from '@nestjs/common';
import { BoardsService } from './board.service';
import { BoardsResolver } from './board.resolver';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardsService,
  ],
})
export class BoardsModule {}
