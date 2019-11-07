module.exports = (req, res, next) => {
    if (req.session.username) {
        next();
        return;
    }
    console.log('登陆失效')
}