import express from 'express';
import mongoose from 'mongoose';

import { makeToken } from './phone.js';

const app = express();

app.get('/tokens/phone', (req, res) => {
  const token = makeToken()
  res.send(token);
});

// mongoose.connect("mongodb://quizdatabase:27017/quizdocker")
//   .then(() => console.log("db접속에 성공하였습니다."))
//   .catch(() => console.log("db접속에 실패하였습니다."));

app.listen(3000, () => {
  console.log("3000번 포트에서 대기 중");
});