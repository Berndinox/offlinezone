var express = require('express');
var app = express();

var IOTA = require('iota.lib.js');
var iotajs = new IOTA({
    'provider': 'https://iota.offline.zone:443'
});

app.use(express.static('public'));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.render('index');
})

app.listen(80, () => console.log('Example app listening on port 80!'));