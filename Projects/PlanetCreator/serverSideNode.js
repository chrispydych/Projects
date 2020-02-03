
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

function planet(){};

function drawPlanet(){
    var canvas = document.getElementById('circle');
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        var X = Canvas.width/2;
        var Y = canvas.height/2;
        var R = 45;
    }
};




