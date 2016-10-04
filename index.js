var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 3333));

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/client/index.html")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});