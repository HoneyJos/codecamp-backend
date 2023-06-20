console.log('hello');

function getToken(num) {
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
}

getToken(4);