var express = require('express');
var faye = require('faye');

// Faye setup

var fayeServer = new faye.NodeAdapter({ mount: '/' });
var fayeClient = fayeServer.getClient();

// App setup

var app = express();
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.post('/message', function(req, res) {
  fayeClient.publish('/chatroom', {
    userId: req.body.userId,
    message: req.body.message,
    pergunta: req.body.pergunta,
    alt1: req.body.alt1,
    alt2:req.body.alt2,
    alt3: req.body.alt3,
    alt4: req.body.alt4
  });

  res.send(200);
});

app.post('/resposta', function(req, res) {
  fayeClient.publish('/resposta', {
    resp: req.body.resposta
  });

  res.send(200);
});


fayeServer.listen(8001);
app.listen(8000);
