var Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        username: { type: Sequelize.STRING },
    });

    return User;
}