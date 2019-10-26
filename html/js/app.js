function timeStampStr(date) {
    date = new Date(date);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    return Y + "-" + fill0(M) + "-" + fill0(D) + " " + fill0(h) + ":" + fill0(m) + ":" + fill0(s);
}

function fill0(num) {
    return num < 10 ? "0" + num : num
}