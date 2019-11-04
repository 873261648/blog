$(function () {
    initHeader();
});

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
function getUrlParams() {
    let url = decodeURIComponent(window.location.href);
    if (url.indexOf("?") === -1) {
        return {}
    }
    url = url.substring(url.indexOf("?") + 1);
    if (url.indexOf("#/") !== -1) {
        url = url.substring(0, url.indexOf("#/"));
    }
    let params = url.split("&"); // 分割得到的数组；
    let obj = {};
    for (let i = 0; i < params.length; i++) {
        let key = params[i].substr(0, params[i].indexOf("="));
        obj[key] = params[i].substr(params[i].indexOf("=") + 1);
    }
    return obj
}

function initHeader() {
    let userInfoStr = sessionStorage.getItem('userInfo');
    if (userInfoStr) {
        let userInfo = JSON.parse(userInfoStr);
        $("header").append($(`<a id="user_name" href="/admin.html">欢迎你：${userInfo.realname}</a> <a id="user_name" href="javascript:logout();"> 退出</a>`));
    } else {
        $("header").append($(`<a href="/login.html">登录</a>`));
    }
}

function logout() {
    $.ajax({
        url: "/api/user/logout",
        success(res) {
            sessionStorage.removeItem('userInfo');
            location.href = "/"
        }
    })
}