import { User } from "../models/user.model.js";


export class UserController {
  UserService;
  constructor(userService) {
    this.UserService = userService;
  }


  getUsers = async (req, res) => {
    const users = await User.find();
    res.send(users);
  }

  createUser = async (req, res) => {
    const isValidUser = await this.UserService.isValidUser(req, res);
    if (!isValidUser) {
      return res.status(422).send('에러!! 핸드폰 번호가 인증되지 않았습니다');
    }

    const og = await this.UserService.createMessage(req, res);

    const result = await this.UserService.createModel(req, res, og);

    if (result) {
      return res.send(true)
    } return res.send('이미 등록된 사용자입니다.')

  }
}