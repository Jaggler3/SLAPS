var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/public/'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000);
