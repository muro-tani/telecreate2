const SerialPort = require("serialport");
const fs = require("fs");
const debug = require("debug")("create2:driver");
const Repl = require("repl");

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {serveClient: true});


app.set('port', (process.env.PORT || 3333));

app.use(express.static(__dirname + '/client'));

const irobotCommand = require("./irobotConnect.js");
irobotCommand.start(io, fs, debug);

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/client/index.html")
});

app.get('/socket.io/socket.io.js', function(req,res) {
    res.sendFile(__dirname + "/node_modules/socket.io-client/socket.io.js");
})

app.get('/gamepadSample', function(req, res) {
    res.sendFile(__dirname + "/client/gamepadSample/index.html")
});

app.get('/crosskeyInput', function(req, res) {
    res.sendFile(__dirname + "/client/crosskeyInput/index.html")
});

app.get('/peerSender', function(req, res) {
    res.sendFile(__dirname + "/client/peerSender/index.html")
});

app.get('/peerReciever', function(req, res) {
    res.sendFile(__dirname + "/client/peerReciever/index.html")
});

app.get('/create2RemoteController_v0', function(req, res) {
    res.sendFile(__dirname + "/client/create2RemoteController_v0/index.html")
});

app.get('/simpleVideoChat', function(req, res) {
    res.sendFile(__dirname + "/client/simpleVideoChat/index.html")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});