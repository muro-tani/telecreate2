var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 3333));

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/client/index.html")
});

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});