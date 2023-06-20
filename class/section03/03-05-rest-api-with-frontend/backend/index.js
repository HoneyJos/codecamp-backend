// const express = require('express') //
import express from 'express'; // export default 가져오기
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'; // export 가져오기

// import * as ttt from './phone.js';                                       // export 한방에 다 가져오기
// ttt.getToken
// ttt.sendTokenToSMS


import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import cors from 'cors';

const app = express();
app.use(express.json()); // 옛날에는 bodyParser 사용(다운받아서) 지금은 익스프레스에 내장된거 사용
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))); // 미들웨어를 2개를 쓴거임.

app.get('/boards', function (req, res) {
	// 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
	const result = [
		{ number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요!!!" },
		{ number: 2, writer: "영희", title: "영희입니다~~", contents: "영희이에요!!!" },
		{ number: 3, writer: "훈이", title: "훈이입니다~~", contents: "훈이이에요!!!" },
	]

	// 2. DB에서 꺼내온 결과를 브라우저에 응답(response)
	res.send(result);
});

app.post('/boards', function (req, res) {
	// 1. 브라우저에서 보내준 데이터 확인하기
	console.log(req);
	console.log("==========================")
	console.log(req.body);

	// 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정


	// 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
	res.send('게시물 등록에 성공하였습니다.');
});

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

app.listen(3000);