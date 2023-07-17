import { CreateUserInput } from '../dtos/createUser.input';

export interface ICreateUserService {
  createUserInput: CreateUserInput;
}

export interface IFindMyProfileUserService {
  loginUser: string;
}
