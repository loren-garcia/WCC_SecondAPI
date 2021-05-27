const Agendamento = require('./Agendamento');
const SequelizeAgendamento = require('../models/SequelizeAgendamento');

module.exports = {

    carregarTodosAgendamentos: async(req, res) => {
        try {
            const results = await SequelizeAgendamento.listar();

            res.status(201).send(JSON.stringify(results));
        }catch(error) {
            res.status(401).send(JSON.stringify({error: error.message}));
        }
    },

    carregarAgendamento: async(req, res) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});

            await agendamento.buscar();
            res.status(201).send(JSON.stringify(agendamento));
        }catch(error) {
            res.status(401).send(JSON.stringify({error: error.message}));
        }
    },

    criarAgendamento: async(req, res) => {
        try {
            const reqAgendamento = req.body;
            const agendamento = new Agendamento(reqAgendamento);

            await agendamento.criar();
            res.status(201).send(JSON.stringify(agendamento));
        }catch(error) {
            res.status(401).send(JSON.stringify({error: error.message}));
        }
    },

    deletarAgendamento: async(req, res) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});

            await agendamento.remover();
            res.status(200).send(JSON.stringify({message: `Agendamento ${id} removido com sucesso`}));
        }catch(error) {
            res.status(404).send(JSON.stringify({error: error.message}));
        }
    },

    alterarAgendamento: async(req, res) => {
        try {
            const id = req.params.id;
            const dadosBody = req.body;
            const dados = Object.assign({}, dadosBody, {id: id});
            const agendamento = new Agendamento(dados);

            await agendamento.atualizar();
            res.status(204).send();
        }catch(error) {
            res.status(400).send(JSON.stringify({error: error.message}));
        }
    }
}