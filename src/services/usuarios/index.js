const SequelizeUsuario = require('../../models/usuarios/SequelizeUsuario.js');
const SerializarUsuario = require('../../shared/Serializar').SerializarUsuario;
const Usuario = require('./Usuario');

module.exports = {

    delete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const usuario = new Usuario({id: id});

            await usuario.remover();
            const serializar = new SerializarUsuario(
                res.getHeader('Content-Type')
            );
            res.status(200).send(serializar.transformar({message: `Usuário ${id} removido com sucesso`}));
        } catch(error) {
            next(error);
        }
    },

    carregarUsuario: async (req, res, next) => {
        try {
            const id = req.params.id;
            const usuario = new Usuario({id: id});

            await usuario.buscarPorId();
            const serializar = new SerializarUsuario(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializar.transformar(usuario));
        } catch(error) {
            next(error);
        }
    },

    carregarTodosUsuarios: async (req, res, next) => {
        try {
            const results = await SequelizeUsuario.listar();
            
            const serializar = new SerializarUsuario(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializar.transformar(results));
        } catch(error) {
            next(error);
        }
    },

    alterarUsuario: async (req, res, next) => {
        try {
            const id = req.params.id;
            const dadosBody = req.body;
            const dados = Object.assign({}, dadosBody, {id: id});
            const usuario = new Usuario(dados);

            await usuario.atualizar();
            const serializar = new SerializarUsuario(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializar.transformar(usuario));
        } catch(error) {
            next(error);
        }
    },

    criarUsuario: async (req, res, next) => {
        try {
            const dados = req.body;
            const usuario = new Usuario(dados);
            
            await usuario.criar();
            const serializar = new SerializarUsuario(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializar.transformar(usuario));
        } catch(error) {
            next(error);
        }
    }
}