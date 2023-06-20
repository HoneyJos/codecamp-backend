function getToday() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${h}:${m}:${s} 입니다`
}

console.log(getToday());