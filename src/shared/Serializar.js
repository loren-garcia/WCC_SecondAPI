const formatoInvalido = require('../errors/FormatoInvalido');

class Serializar {
    json(dados) {
        return JSON.stringify(dados);
    }

    transformar(dados) {
        if(this.contentType !== 'application/json') {
            throw new formatoInvalido(this.contentType);
        }
        return this.json(dados);
    }
}

class SerializarAgendamento extends Serializar {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    }
}