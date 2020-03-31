const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');

const app = express();

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso');
    })

    .catch(error => {
        console.log(error);
    })

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', async (req, res) => {

    Pergunta.findAll({
        raw: true,
        order: [
            ['updatedAt', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas
        });
    });

});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.get('/responder/:id', async (req, res) => {

    const { id } = req.params;

    const pergunta = await Pergunta.findOne({
        raw: true,
        where: { id }
    });

    if (!pergunta) {
        res.redirect('/');
    } else {
        res.render('responder', {
            pergunta
        });
    }
});

app.get('/respostas/:id', async (req, res) => {

    const { id } = req.params;

    const pergunta = await Pergunta.findOne({
        raw: true,
        where: { id }
    });

    if (!pergunta) {
        res.redirect('/');
    } else {
        const respostas = await Resposta.findAll({
            raw: true,
            where: {
                id_pergunta: id
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        })

            .then(respostas => {
                res.render('respostas', {
                    pergunta,
                    respostas
                });
            });
    }
});

app.post('/salvarpergunta', (req, res) => {

    const { titulo, descricao } = req.body;

    Pergunta.create({
        titulo,
        descricao
    })

        .then(() => {
            res.redirect('/');
        });
});

app.post('/responder/', async (req, res) => {
    const { nome_usuario, resposta, id_pergunta } = req.body;

    Resposta.create({
        corpo: resposta,
        id_pergunta,
        nome_usuario: !nome_usuario.trim() ? 'Anônimo' : nome_usuario
    })

        .then(() => {
            res.redirect(`/respostas/${id_pergunta}`);
        });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App rodando.');
});
