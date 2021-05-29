const Agendamento = require('./Agendamento');
const SequelizeAgendamento = require('../models/SequelizeAgendamento');
const SerializarAgendamento = require('../shared/Serializar').SerializarAgendamento;

module.exports = {

    carregarTodosAgendamentos: async(req, res, next) => {
        try {
            const results = await SequelizeAgendamento.listar();

            const serializador = new SerializarAgendamento(
                res.getHeader('Content-Type')
            );

            res.status(201).send(serializador.transformar(results));

            //res.status(201).send(JSON.stringify(results));
        }catch(error) {
            //res.status(401).send(JSON.stringify({error: error.message}));
            next(error);
        }
    },

    carregarAgendamento: async(req, res, next) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});

            await agendamento.buscar();

            const serializador = new SerializarAgendamento(
                res.getHeader('Content-Type')
            )
            res.status(201).send(serializador.transformar(agendamento))
        }catch(error) {
            next(error);
        }
    },

    criarAgendamento: async(req, res, next) => {
        try {
            const reqAgendamento = req.body;
            const agendamento = new Agendamento(reqAgendamento);

            await agendamento.criar();

            const serializador = new SerializarAgendamento(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializador.transformar(agendamento));
        }catch(error) {
            next(error);
        }
    },

    deletarAgendamento: async(req, res, next) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});

            await agendamento.remover();
            
            const serializador = new SerializarAgendamento(
                res.getHeader('Content-Type')
            );
            res.status(200).send(serializador.transformar({message: `Agendamento ${id} removido com sucesso`}));
        }catch(error) {
            next(error);
        }
    },

    alterarAgendamento: async(req, res, next) => {
        try {
            const id = req.params.id;
            const dadosBody = req.body;
            const dados = Object.assign({}, dadosBody, {id: id});
            const agendamento = new Agendamento(dados);            

            await agendamento.atualizar();

            const serializador = new SerializarAgendamento(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializador.transformar(agendamento));
        }catch(error) {
            next(error);
        }
    }
}