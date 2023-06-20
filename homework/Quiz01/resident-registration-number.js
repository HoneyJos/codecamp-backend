function isCenterValid(id) {
    if (id.charAt(6) !== '-') {
        return false
    } return true
}

function isValidCount(id) {
    if (id.substring(0, 6).length !== 6 || id.substring(7).length !== 7) {
        return false
    } return true
}

function backHidden(id) {
    const result = id.substring(0, 8) + "******";
    return console.log(result)
}


function customRegistrationNumber(id) {
    if (!isCenterValid(id)) {
        console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
        return
    } else if (!isValidCount(id)) {
        console.log("에러 발생!!! 개수를 제대로 입력해주세요!!!");
        return
    } backHidden(id)
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");