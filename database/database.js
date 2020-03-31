const Sequelize = require('sequelize');

const connection = new Sequelize('sql3327590', 'sql3327590', 'EaJ8PDNbME', {
    host: 'sql3.freesqldatabase.com',
    dialect: 'mysql'
});

module.exports = connection;