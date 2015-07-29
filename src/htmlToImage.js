'use strict';
var express = require('express');
var path = require('path');
var router = new express.Router();
var spawn = require('child_process').spawn;

router
    .route('/html2image')
    .get(function(req, res) {
        return res.status(200).type('text').send('OK');
    })
    .post(function(req, res) {
        var phantomjs = spawn('phantomjs', [
            path.join(__dirname, 'render.phantom.js')
        ]);
        var error = {};
        var image = '';
        var timer;

        phantomjs.stdout.on('data', function(data) {
            image += data.toString();
        });

        phantomjs.stderr.on('data', function(data) {
            console.error('phantomjs stderr: ' + data);
        });

        phantomjs.on('close', function(code) {
            clearTimeout(timer);
            if (code === 0 && image) {
                res.status(201).type('png').send(new Buffer(image, 'base64'));
            } else {
                res.status(error.status || 500).type('text').send(error.msg || 'no image');
            }
        });

        phantomjs.stdin.setEncoding('utf8');
        phantomjs.stdin.write(req.body);
        phantomjs.stdin.end();

        timer = setTimeout(function() {
            error = { status: 504, msg: 'timeout' };
            phantomjs.kill('SIGINT');
        }, 15000);
    });

module.exports = router;
