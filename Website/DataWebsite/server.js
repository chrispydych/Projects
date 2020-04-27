const http = require('http');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



var d3 = require("d3");
console.log("blah");



//world = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")