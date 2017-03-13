var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

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

io.on('connection', function(socket){
  console.log('User connected');
  socket.on('question', function(question){
    console.log('Question selected: ' + question.selection);
    io.sockets.emit('qGraph', question);
  });
  socket.on('technologies', function(technologies){
    console.log('Technologies selected: ' + technologies);
  });
});

http.listen(9001, function(){
  console.log('listening on *:9001');
});

app.use(function (req, res, next) {
	var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host;
        res.setHeader('Access-Control-Allow-Origin', "http://"+hostname+":3000");
   	    res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);
