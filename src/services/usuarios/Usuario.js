const SequelizeUsuario = require('../../models/usuarios/SequelizeUsuario');

class Usuario {
    constructor({
        id, nome, email, senha, data_criacao, data_atualizacao
    }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.senhaHash = '';
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
    }

    async criar() {
        const result = await SequelizeUsuario.adicionar({
            nome: this.nome,
            email: this.email,
            senha: this.senhaHash
        });
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    }
}