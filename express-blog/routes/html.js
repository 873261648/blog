const express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

function handler(req, res, next) {
    let fileName = req.path.replace("/", '');
    fs.readdir(path.join(__dirname, '../', 'views'), (err, fileList) => {
        if (fileList.indexOf(fileName) !== -1) {
            res.sendFile(path.join(__dirname, '../', 'views', fileName));
            return;
        }
        next()
    });
}

module.exports = handler;