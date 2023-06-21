import coolsms from 'coolsms-node-sdk';
const mysms = coolsms.default;

export function checkValidationPhone(myphone) {
    if (myphone.length < 10 || myphone.length > 11) {
        console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
        return false
    } return true
}

export function getToken(count) {
    const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(
        6,
        '0',
    );
    return result;
    // console.log(result)
}

export async function sendTokenToSMS(myphone, result) {
    const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET);
    const smsResult = await messageService.sendOne({
        to: myphone,
        from: process.env.SMS_SENDER,
        text: `[코드캠프] 안녕하세요?! 요청하신 인증번호는 ${result}입니다.`
    })

    console.log(smsResult);

    // console.log(myphone + '번호로 인증번호' + result + '를 전송합니다!!');
}
