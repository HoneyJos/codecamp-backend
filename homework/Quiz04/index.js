import express from 'express';

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(express.json());

app.get("/users", (req, res) => {
  const users = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222"

    },
    {
      email: "bbb@bbb.com",
      name: "Judy",
      phone: "010-1234-5678",
      personal: "220110-2222222"
    },
    {
      email: "ccc@ccc.com",
      name: "Anna",
      phone: "010-1234-5678",
      personal: "220110-2222222"
    },
    {
      email: "ddd@ddd.com",
      name: "Elasa",
      phone: "010-1234-5678",
      personal: "220110-2222222"
    },
    {
      email: "eee@eee.com",
      name: "Honey",
      phone: "010-1234-5678",
      personal: "220110-2222222"
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

app.listen(3000, () => {
  console.log("3000번 포트에서 대기 중");
})