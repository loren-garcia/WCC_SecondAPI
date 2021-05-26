const Agendamento = require('./Agendamento');

module.exports = {

    carregarAgendamento: async(req, res) => {
        try {
            const id = req.params.id;
            const agendamento = new Agendamento({id: id});

            await agendamento.buscar();
            res.status(201).send(JSON.stringify(agendamento));
        }catch(error) {
            res.status(401).json(JSON.stringify(error));
        }
    },

    criarAgendamento: async(req, res) => {
        try {
            const reqAgendamento = req.body;
            const agendamento = new Agendamento(reqAgendamento);

            await agendamento.criar();
            res.status(201).send(JSON.stringify(agendamento));
        }catch(error) {
            res.status(401).json(JSON.stringify(error));
        }
    }
}