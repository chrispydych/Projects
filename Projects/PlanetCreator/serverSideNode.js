
var http = require("http");
fs = require('fs');

var express = require('express');
var app = express();


var server = http.createServer(function (request, response) {
    console.log("Got a request: " + request.url);
    response.writeHeader(200, { "Content-Type": "text/html" });
    var clientUI = fs.createReadStream("./planetCreator.html");
    clientUI.pipe(response);
});

server.listen(8080);