import express from 'express';
import cors from 'cors';

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js';
import 'dotenv/config'
import mongoose from 'mongoose';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  const users = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"

    },
    {
      email: "bbb@bbb.com",
      name: "Judy",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "ccc@ccc.com",
      name: "Anna",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "ddd@ddd.com",
      name: "Elasa",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
    {
      email: "eee@eee.com",
      name: "Honey",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com"
    },
  ];
  res.send(users);
});

app.get("/starbucks", (req, res) => {
  const coffees = [
    { name: '아메리카노', kcal: 5 },
    { name: '카페라떼', kcal: 10 },
    { name: '카페모카', kcal: 50 },
    { name: '콜드브루', kcal: 15 },
    { name: '돌체라떼', kcal: 500 },
    { name: '카라멜라떼', kcal: 200 },
    { name: '바닐라라떼', kcal: 20 },
    { name: '에스프레소', kcal: 1 },
    { name: '디카페인', kcal: 5 },
    { name: '오트라떼', kcal: 300 },
  ];
  res.send(coffees);
})

app.post('/tokens/phone', function (req, res) {
  const myphone = req.body.phoneNumber;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);

    res.send("인증완료!!!");
  }
})

app.post("/users", function (req, res) {
  // const name = req.body.name;
  // const age = req.body.age;
  // const school = req.body.school;
  // const email = req.body.email;
  const { name, phoneNumber, prefer, email } = req.body;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-@포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return
  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, phoneNumber, prefer });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);

  res.send("가입완료!!!");
});

mongoose.connect("mongodb://yourdatabase:27017/yourdocker")
  .then(() => console.log("db 접속에 성공하였습니다."))
  .catch(() => console.log("db 접속에 실패하였습니다."));

app.listen(3000, () => {
  console.log("3000번 포트에서 대기 중");
})