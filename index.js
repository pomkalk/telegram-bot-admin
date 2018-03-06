var express = require('express');
var app = express();
var http = require('http').Server(app);

var cfg = require('./config');

app.use(express.static(__dirname+'/public'));

http.listen(cfg.server.port, ()=>{
    console.log('Server started on port *: '+cfg.server.port);
});