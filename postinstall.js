var fs = require('fs');
var Sequelize = require('sequelize');

if ( !fs.existsSync('./config.js') ) {
    fs.copyFileSync('./config.example.js', 'config.js');
    console.log('Configuration file created. [config.js]');
    console.log('Don\'t forget to change configuration file');
}else{
    console.log('COnfiguration file config.js already exists.');
}
var cfg = require('./config');
var sequelize = new Sequelize(cfg.server.database);
var User = require('./models/user.model')(sequelize);
sequelize.sync();