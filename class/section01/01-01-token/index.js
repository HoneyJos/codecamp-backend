console.log('hello');

function getToken(num) {
    const result = String(Math.floor(Math.random() * 10 ** num)).padStart(num, "0");
    console.log(result);
}

getToken(4);