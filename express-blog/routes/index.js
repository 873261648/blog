const express = require('express');
const router = express.Router(),
    path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views/index.html'));
});

module.exports = router;
