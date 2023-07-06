import { Module } from '@nestjs/common';
import { NotebooksResolver } from './notebooks.resolver';
import { NotebooksService } from './notebooks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { NotebooksStatus } from '../notebookStatus/entities/notebooksStatus.entity';
import { NotebooksStatusService } from '../notebookStatus/notebooksStatus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notebook,
      NotebooksStatus, //
    ]),
  ],
  providers: [NotebooksResolver, NotebooksService, NotebooksStatusService],
})
export class NotebooksModule {}
