'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');

var PORT = process.env.PORT;

if (!PORT || PORT < 8000 || PORT >= 9000) {
    return console.error('invalid PORT: ' + PORT);
}

express()
    .use(morgan('tiny'))
    .use(bodyParser.json())
    .use('/', require('./htmlToImage'))
    .listen(PORT);

console.info('http://localhost:' + PORT);
