var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// serve up the web client page
app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/client/index.html');
});

// socketio for the web client
var fromDraw = io.of('/draw');
fromDraw.on('connection', function(client) {
    client.on('csvAnm', function(d) {
        console.log('got csvAnm event');
        // TODO send to Processing
        toServers.emit('bdmsg', d);
    });
});

// socketio for the Processing client
var toServers = io.of('/toservers');
toServers.on('connection', function(client) {
    console.log('toServers connection with Processing');
});

server.listen(3000);
