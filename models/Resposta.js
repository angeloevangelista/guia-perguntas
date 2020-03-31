const Sequelize = require('sequelize');
const connection = require('../database/database');

const Resposta = connection.define('Resposta', {
    id_pergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nome_usuario: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

Resposta.sync({
    force: false
});

module.exports = Resposta;