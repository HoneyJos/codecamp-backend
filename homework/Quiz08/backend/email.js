import { getToday } from "./utils.js";
import nodemailer from 'nodemailer';

export function checkEmail(email) {
    if (email === undefined || email.includes("@") === false) {
        console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!")
        return false
    } return true
}

export function getWelcomeTemplate({ name, phoneNumber, prefer }) {
    const template = `
        <html>
            <body>
                <div style="display: flex; flex-direction: column; align-items: center">
                    <div style="width: 500px">
                        <h1>${name}님 가입을 환영합니다</h1>
                        <hr>
                        <div>이름: ${name}</div>
                        <div>전화번호: ${phoneNumber}</div>
                        <div>좋아하는 사이트: ${prefer}</div>
                        <div>가입일: ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `;
    return template
}

export async function sendTemplateToEmail(email, template) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const res = await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "[코드캠프] 가입을 축하합니다!!!",
        html: template
    });
    console.log(res);


    // console.log(`${email} 이메일로 가입환영템플릿 ${template}을 전송합니다.`)
}