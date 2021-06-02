const jsontoxml = require('jsontoxml');
const formatoInvalido = require('../errors/FormatoInvalido');

class Serializar {
    json(dados) {
        return JSON.stringify(dados);
    }

    transformar(dados) {
        dados = this.filtrar(dados);
        if(this.contentType === 'application/json') {
            return this.json(dados);
        }
        if(this.contentType === 'application/xml') {
            return this.xml(dados);
        }
        throw new formatoInvalido(this.contentType);
    }

    xml(dados) {
        if(Array.isArray(dados)) {
            dados = dados.map(item => {
                return {
                    [this.tag]: item
                }
            });
            this.tag = this.tagList;
        }
        return jsontoxml({
            [this.tag]: dados
        });
    }

    filtrarCampos(dados) {
        const camposFiltrados = {};
        this.camposPermitidos.forEach(campo => {
            if(dados.hasOwnProperty(campo)) {
                camposFiltrados[campo] = dados[campo];
            }
        });
        return camposFiltrados;
    }

    filtrar(dados) {
        let dadosFiltrados = this.filtrarCampos(dados);

        if(Array.isArray(dados)) {
            dadosFiltrados = dados.map(dado => {
                return this.filtrarCampos(dado);
            });
        }

        return dadosFiltrados;
    }

}

class SerializarAgendamento extends Serializar {
    constructor(contentType, camposPersonalizados) {
        super();
        this.camposPermitidos = ['id', 'nome_cliente', 'data_agendamento', 'nome_servico', 'message'].concat(camposPersonalizados || []);
        this.contentType = contentType;
        this.tag = 'Agendamento';
        this.tagList = 'Agendamentos';
    }
}

class SerializarUsuario extends Serializar {
    constructor(contentType, camposPersonalizados) {
        super();
        this.camposPermitidos = ['id', 'nome', 'email', 'message'].concat(camposPersonalizados || []);
        this.contentType = contentType;
        this.tag = 'Usuario';
        this.tagList = 'Usuarios';
    }
}

class SerializarErro extends Serializar {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.camposPermitidos = [
            'id', 'mensagem'
        ];
        this.tag = 'Error';
        this.tagList = 'Errors';
    }
}

module.exports = {
    Serializar,
    SerializarAgendamento,
    SerializarUsuario,
    SerializarErro,
    FormatosValidos: ['application/json', 'application/xml']
}