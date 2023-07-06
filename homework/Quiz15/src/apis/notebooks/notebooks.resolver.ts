import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotebooksService } from './notebooks.service';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookInput } from './dtos/create-notebook.input';
import { NotebooksStatusService } from '../notebookStatus/notebooksStatus.service';
import { NotebooksStatus } from '../notebookStatus/entities/notebooksStatus.entity';
import { UpdateNotebookInput } from './dtos/update-notebook.input';

@Resolver()
export class NotebooksResolver {
  constructor(
    private readonly notebooksService: NotebooksService,
    private readonly notebooksStatusService: NotebooksStatusService,
  ) {}
  @Query(() => [Notebook])
  fetchNotebooks() {
    return this.notebooksService.findAll();
  }

  @Query(() => Notebook)
  fetchNotebook(@Args('notebookId') notebookId: string) {
    return this.notebooksService.find({ notebookId });
  }

  @Mutation(() => Notebook)
  createNotebook(
    @Args('createNotebookInput') createNotebookInput: CreateNotebookInput,
  ) {
    return this.notebooksService.create({ createNotebookInput });
  }

  @Query(() => [NotebooksStatus])
  fetchStatus() {
    return this.notebooksStatusService.find();
  }

  @Mutation(() => Notebook)
  updateNotebook(
    @Args('notebookId') notebookId: string,
    @Args('updateNotebookInput') updateNotebookInput: UpdateNotebookInput,
  ) {
    return this.notebooksService.update({ notebookId, updateNotebookInput });
  }

  @Mutation(() => Boolean)
  deleteNotebook(@Args('notebookId') notebookId: string): Promise<boolean> {
    return this.notebooksService.delete({ notebookId });
  }

  @Mutation(() => Boolean)
  restoreNotebook(@Args('notebookId') notebookId: string): Promise<boolean> {
    return this.notebooksService.restore({ notebookId });
  }
}
