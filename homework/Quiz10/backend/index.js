import express from "express";
import connect from "./models/index.js";
import cors from 'cors';

import { User } from "./models/user.model.js";
import { Token } from "./models/token.model.js";
import { UserController } from './controllers/user.controller.js';
import { UserService } from "./controllers/services/user.service.js";


connect();

const app = express();

app.use(cors());
app.use(express.json());

const userService = new UserService();
const userController = new UserController(userService);
app.get('/users', userController.getUsers);
app.post('/users', userController.createUser);

app.post('/tokens/phone', async (req, res) => {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  const phone = req.body.phone;
  const isNewUser = (await Token.find({ phone })).length === 0;
  if (isNewUser) {
    const result = await Token.create({
      phone: phone,
      token: token,
    })
    return res.send(`핸드폰 인증 문자는 ${token}입니다`);
  }
  const result = await Token.updateOne({ phone }, { token })
  res.send(`핸드폰 인증 문자는 ${token}입니다`)
});


app.patch('/tokens/phone', async (req, res) => {
  const phone = req.body.phone;
  const result = await Token.find({ phone })
  const isNotExist = result.length === 0;
  const isValid = result[0]?.token === req.body.token;
  if (isNotExist) {
    return res.send(false)
  } else if (!isValid) {
    return res.send(false)
  }
  const isAuth = await Token.updateOne({ phone }, { isAuth: true });
  res.send(true);
});


app.listen(3000, () => {
  console.log("3000번 포트에서 대기 중");
});