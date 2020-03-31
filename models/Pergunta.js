const Sequelize = require('sequelize');
const connection = require('../database/database');

const Pergunta = connection.define('Pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({
    force: false
})

    .then(() => {
        console.log(`Tabela 'Pessoa' criada.`);
    });

module.exports = Pergunta;