var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cfg = require('./config');
var TelegramBot = require('node-telegram-bot-api');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(cfg.server.database);
var User = require('./models/user.model')(sequelize);


const bot = new TelegramBot(cfg.bot.token, {polling: true});

bot.onText(/\/start/, (msg)=>{
   User.findOrCreate({
       where: {id: msg.from.id},
       defaults: {
           first_name: msg.from.first_name,
           last_name: msg.from.last_name,
           username: msg.from.username
       }
   }).spread((user, created)=>{
        if (created) {
            bot.sendMessage(msg.chat.id, 'Hello new user, you are welcome.');
        } else{
            bot.sendMessage(msg.chat.id, 'Hello '+user.username);
        }
        User.findAll().then((users)=>{
            io.emit('users update', users.map(i=>i.toJSON()));
        });
   });
});

app.use(express.static(__dirname+'/public'));

io.on('connect', (socket)=>{
    console.log('user connected');
    User.findAll().then((users)=>{
        io.emit('users update', users.map(i=>i.toJSON()));
    });
});

http.listen(cfg.server.port, ()=>{
    console.log('Server started on port *: '+cfg.server.port);
});