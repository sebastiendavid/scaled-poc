'use strict';
var express = require('express');
var router = new express.Router();

router
    .route('/html2image')
    .get(function(req, res) {
        return res.status(200).type('text').send('OK');
    })
    .post(function(req, res) {
        return res.status(201).type('png').send(null);
    });

module.exports = router;
