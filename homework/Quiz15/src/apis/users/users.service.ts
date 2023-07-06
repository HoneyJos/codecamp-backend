import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create({ createUserInput }) {
    return this.userRepository.save({ ...createUserInput });
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
