import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserService } from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ createUserInput }: ICreateUserService) {
    const hash = await bcrypt.hash(createUserInput.password, 10);
    return this.userRepository.save({ ...createUserInput, password: hash });
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
