var fs = require('fs');
var path = require('path');
var express = require('express');
var mysql = require('mysql'); 
var app = express();

var htmlPath = path.join(__dirname, 'html');

app.use('/database', express.static(htmlPath));

var server = app.listen(3000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://' + host + ':' + port + '/');
});

