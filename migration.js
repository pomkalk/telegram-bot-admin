var cfg = require('./config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(cfg.server.database);
var User = require('./models/user.model')(sequelize);
sequelize.sync();