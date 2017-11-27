const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const IOTA = require('iota.lib.js');
var iotajs = new IOTA({
    'provider': 'https://iota.offline.zone:443'
});

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

var nodeInfo;
function nodeInfo() {
    iotajs.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        nodeInfo = success;
    }
})
}
setInterval(nodeInfo, 1000); //time is in ms




io.sockets.on('connection', function (socket) {
    setInterval(function(){
      io.sockets.emit('nodeInfo', nodeInfo);
    }, 1000);
    //socket.on('disconnect', function () {
        //user disconnected
        //emit to every opened socket, so everyone has up to date data
    //    io.sockets.emit('nodeInfo', nodeInfo);
    //});
});

http.listen(80, function(){
  console.log('listening on *:80');
});
    