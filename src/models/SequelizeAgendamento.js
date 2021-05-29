const TabelaAgendamento = require('./TabelaAgendamento');
const NaoEncontrado = require('../errors/NaoEncontrado');

module.exports = {

    async listar() {
        try {
            return await TabelaAgendamento.findAll({
                raw: true
            });
        }catch(error) {
            throw error;
        }
    },

    async buscarPorPK(id) { // primary key
        try {
            result = await TabelaAgendamento.findByPk(id);

            if(!result) {
                throw new NaoEncontrado('agendamento');
            }

            return result;
        }catch(error) {
            throw error;
        }
    },

    async adicionar(agendamento) {
        try{
            result = await TabelaAgendamento.create(agendamento);
            return result;
        }catch(error) {
            throw error;
        }
    },

    async atualizar(id, dados) {
        try{
            result = await TabelaAgendamento.update(dados, {
                where: {
                    id: id
                }
            });
            return result;
        }catch(error) {
            throw error;
        }
    },

    async deletar(id) {
        try{
            result = await TabelaAgendamento.destroy({
                where: {
                    id: id
                }
            });
            return result;
        }catch(error) {
            throw error;
        }
    }
};