import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotebooksStatus } from './entities/notebooksStatus.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotebooksStatusService {
  constructor(
    @InjectRepository(NotebooksStatus)
    private readonly notebooksStatusRepository: Repository<NotebooksStatus>,
  ) {}
  find() {
    return this.notebooksStatusRepository.find();
  }
}
