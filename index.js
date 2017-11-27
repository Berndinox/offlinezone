const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const IOTA = require('iota.lib.js');
var iotajs = new IOTA({
    'provider': 'https://iota.offline.zone:443'
});

app.use(express.static('public'));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.render('index');
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
    