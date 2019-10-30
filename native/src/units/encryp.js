const crypto = require('crypto');

const SECRET_KEY = "HELLO_<>#@SDWIWORD";

function md5(str) {
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex')
}

function genPassword(password) {
    const str = `value:${password};key:${SECRET_KEY}`;
    return md5(str)
}

module.exports = {
    genPassword
};