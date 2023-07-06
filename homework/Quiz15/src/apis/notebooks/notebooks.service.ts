import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private readonly notebooksRepository: Repository<Notebook>, //
  ) {}
  findAll() {
    return this.notebooksRepository.find({ relations: ['status', 'user'] });
  }
  find({ notebookId }) {
    return this.notebooksRepository.findOne({
      where: { id: notebookId },
      relations: ['status', 'user'],
    });
  }
  create({ createNotebookInput }) {
    const { notebookStatus, ...notebook } = createNotebookInput;
    return this.notebooksRepository.save({
      ...notebook,
      status: {
        id: notebookStatus,
      },
    });
  }

  async update({ notebookId, updateNotebookInput }) {
    const notebook = await this.notebooksRepository.findOne({
      where: { id: notebookId },
      relations: ['status', 'user'],
    });
    const { userId, statusId } = updateNotebookInput;
    const isNoneUser = ({ statusId, userId }) => {
      if (
        statusId === 'db3d62fb-1a35-11ee-884a-0242ac150002' ||
        'bf51def7-1a35-11ee-884a-0242ac150002'
      ) {
        return null;
      }
      return userId;
    };
    const newNotebook = {
      ...notebook,
      user: { id: isNoneUser({ statusId, userId }) },
      status: { id: statusId },
    };
    console.log(newNotebook);

    const result = await this.notebooksRepository.save(newNotebook);
    return result;
  }

  async delete({ notebookId }): Promise<boolean> {
    const result = await this.notebooksRepository.softDelete({
      id: notebookId,
    });
    return result.affected ? true : false;
  }

  async restore({ notebookId }): Promise<boolean> {
    const result = await this.notebooksRepository.restore({ id: notebookId });
    return result.affected ? true : false;
  }
}
