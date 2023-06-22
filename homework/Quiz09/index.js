import express from 'express';
import mongoose from 'mongoose';

import { makeToken } from './phone.js';
import { Token } from './models/token.model.js'

const app = express();
app.use(express.json());

app.post('/tokens/phone', async (req, res) => {
  const isExist = await Token.find({ phone: req.body.phone }, 'phone');
  const token = makeToken()
  if (req.body.phone === isExist[0]?.phone) { // 옵셔널 체닝 써서 cannot read properties error 없어짐 굿
    const result = await Token.updateOne(
      { phone: req.body.phone },
      { token }
    )
  } else {
    const tokens = new Token({
      token,
      phone: req.body.phone,
    })
    await tokens.save();
  }


  res.send(token);
});

app.patch('/tokens/phone', async (req, res) => {
  const result = await Token.find({ phone: req.body.phone }, 'token');
  if (result[0]?.token === req.body.token) {
    const updateAuth = await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
    return res.send(true);
  }
  res.send(false)

});

mongoose.connect("mongodb://yourdatabase:27017/yourdocker")
  .then(() => console.log("db접속에 성공하였습니다."))
  .catch(() => console.log("db접속에 실패하였습니다."));

app.listen(3000, () => {
  console.log("3000번 포트에서 대기 중");
});