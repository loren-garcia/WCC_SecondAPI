const { removeAllListeners } = require('nodemon');
const NaoEncontrado = require('../../errors/NaoEncontrado.js');
const { atualizar } = require('../agendamentos/SequelizeAgendamento.js');
const TabelaUsuario = require('./TabelaUsuario');

module.exports = {
    async listar() {
        try{
            results = await TabelaUsuario.findAll({});
            return results;
        } catch(error) {
            throw error;
        }
    },

    async adicionar(usuario) {
        try{
            result = await TabelaUsuario.create(usuario);
            return result;
        } catch(error) {
            throw error;
        }
    },

    async buscarPorPK(id) {
        try{
            usuario = await TabelaUsuario.create(id);
            if(!usuario) throw new NaoEncontrado(Usuário);
            return usuario;
        } catch(error) {
            throw error;
        }
    },

    async buscaPorEmail(email) {
        try{
            usuario = await TabelaUsuario.findOne({
                where: {
                    email: email
                }
            });
            if(!usuario) throw new NaoEncontrado('Usuário');
            return usuario;
        } catch(error) {
            throw error;
        }
    },

    async atualizar(id, dados) {
        try {
            result = await TabelaUsuario.update({
                where: {
                    id: id
                }
            });
            return result;
        } catch(error) {
            throw error;
        }
    },

    async remover(id) {
        try {
            result = await TabelaUsuario.remove({
                where: {
                    id: id
                }
            });
            return result;
        } catch(error) {
            throw error;
        }
    }
}