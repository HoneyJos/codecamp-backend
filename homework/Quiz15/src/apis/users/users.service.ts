import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateUserService,
  IFindMyProfileUserService,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ createUserInput }: ICreateUserService) {
    const isExist = await this.findOne({ email: createUserInput.email });
    if (isExist) throw new ConflictException('이미 등록된 이메일입니다.');
    const hash = await bcrypt.hash(createUserInput.password, 10);
    return this.userRepository.save({ ...createUserInput, password: hash });
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne({ email }) {
    return this.userRepository.findOne({ where: { email } });
  }

  findMyProfile({ loginUser }: IFindMyProfileUserService): Promise<User> {
    return this.userRepository.findOne({ where: { id: loginUser } });
  }

  async deleteMyProfile({ loginUser }) {
    const result = await this.userRepository.softDelete({ id: loginUser });
    console.log(result);
    return 'test';
  }

  async updatePassword({ loginUser, password }) {
    // console.log(loginUser, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepository.update(
      { id: loginUser },
      { password: hashedPassword },
    );
    return result.affected;
  }
}
