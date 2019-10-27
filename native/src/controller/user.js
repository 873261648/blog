const exec = require('../db/mysql');

const login = ({userName, password}) => {
    let sql = `SELECT username,realname FROM users WHERE username='${userName}' and password='${password}'`;
    console.log(sql);
    return exec(sql).then(result => {
        return result[0]
    })
};

module.exports = {
    login
};
