'use strict';
var system = require('system');
var webpage = require('webpage');
var phantom = global.phantom;
var page;
var html;
try {
    page = webpage.create();
    page.viewportSize = { width: 1024, height: 768 };
    html = system.stdin.read();
    page.content = html;
    page.onLoadFinished = function() {
        system.stdout.writeLine(page.renderBase64('PNG'));
        phantom.exit(0);
    };
} catch (e) {
    phantom.exit(1);
}
