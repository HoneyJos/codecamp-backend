console.log('hello');

function createTokenOfPhone(myphone) {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    if (myphone.length !== 10 && myphone.length !== 11) {
        console.log("에러 발생!!! 핸도픈 번호를 제대로 입력해 주세요!!!")
        return
    }


    // 2. 핸드폰 토큰 6자리 만들기
    const num = 6
    if (num === undefined) {
        console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
        return
    } else if (num <= 0) {
        console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
        return
    } else if (num > 10) {
        console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
        return
    }

    const result = String(Math.floor(Math.random() * 10 ** num)).padStart(num, "0");
    console.log(result);


    // 3. 핸드폰번호에 토큰 전송하기
    console.log(myphone + ` 번호로 인증번호 ${result} 를 전송합니다!!!`)
}

createTokenOfPhone("01012345678");