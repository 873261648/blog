const {sessionInvalidModel} = require('../model/resModel');

function loginCheck(req, res, next) {
    if (req.session.username) {
        next();
        return;
    }
    res.json(new sessionInvalidModel('会话过期'))
}

module.exports = loginCheck;