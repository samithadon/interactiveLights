var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var writeFile = require('write');

// serve up the web client page
app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/client/index.html');
});

// socketio for the web client
var fromDraw = io.of('/draw');
fromDraw.on('connection', function(client) {

    // when the client sends an animation
    client.on('csvAnm', function(d) {
        console.log('got csvAnm event');

        // send it to Processing to display
        toServers.emit('bdmsg', d);

        // record it locally
        var record_name = get_user_record_name();
        writeFile('user_data/animations/'+record_name+'.csv', d.csv)
           .then(function() {
              console.log('wrote animation to', record_name);
           }); 
    });
});

// socketio for the Processing client
var toServers = io.of('/toservers');
toServers.on('connection', function(client) {
    console.log('toServers connection with Processing');
});

server.listen(3000);

function get_user_record_name() {
    var d = new Date();
    return d.toString() + ' ' + d.getMilliseconds() + 'ms';
}
