const express = require('express'),
    router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
    res.json({
        error: 0,
        data: req.body
    })
});

module.exports = router;