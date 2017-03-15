var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//ENDPOINTS WEB
app.get('/', function(req, res) {
  fs.readFile(__dirname + '/index.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});
app.get('/messages', function(req, res) {
  fs.readFile(__dirname + '/messages.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading messages.html');
      }
      res.writeHead(200);
      res.end(data);
    });
});
app.use('/images', express.static(__dirname + '/images'));
app.use('/resources', express.static(__dirname + '/resources'));

//ENDPOINT WEBSOCKETS
io.on('connection', function(socket){
  socket.on('question', function(question){
    console.log('Question selected: ' + question.selection);
    io.sockets.emit('qGraph', question);
  });
  socket.on('technologies', function(technologies){
    console.log('Technologies selected: ' + technologies);
  });
  socket.on('messages', function(messages){
    console.log('The user ' + messages.user + ' says: ' + messages.message);
    io.sockets.emit('ServerMessages', messages);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(function (req, res, next) {
	var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host;
        res.setHeader('Access-Control-Allow-Origin', "http://"+hostname);
   	    res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);
