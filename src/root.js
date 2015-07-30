'use strict';
var express = require('express');
var router = new express.Router();

router
    .route('/')
    .options(function(req, res) {
        res.status(200).type('text').send('ok');
    })
    .get(function(req, res) {
        res.status(200).type('text').send('ok');
    });

module.exports = router;
