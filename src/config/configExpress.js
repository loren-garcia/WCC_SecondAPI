const express = require('express');
const routesAgendamento = require('../api/agendamentos');
const formatosValidos = require('../shared/Serializar').FormatosValidos;
const SerializarErro = require('../shared/Serializar').SerializarErro;
const CampoQtdMaxima = require('../errors/CampoQtdMaxima');
const CampoQtdMinima = require('../errors/CampoQtdMinima');
const NaoEncontrado = require('../errors/NaoEncontrado');
const CampoInvalido = require('../errors/CampoInvalido');
const FormatoInvalido = require('../errors/FormatoInvalido');

module.exports = () => {
    const app = express();

    //função middleware
    app.use((req, res, next) => {
        let formatoSolicitado = req.header('Accept');

        if(formatoSolicitado === '*/*') {
            formatoSolicitado = 'application/json';
        }

        if(formatosValidos.indexOf(formatoSolicitado) === -1) {
            res.status(406);
            res.end();
            return;
        }

        res.setHeader('Content-Type', formatoSolicitado);
        next();
    })

    app.use(express.json());
    app.use('/api', routesAgendamento);

    // função middleware de erro
    app.use((error, req, res, next) => {
        let status = 500;

        serializarErro = new SerializarErro(res.getHeader('Content-Type'));

        if(error instanceof NaoEncontrado) {
            status = 404;
        }

        if(error instanceof CampoInvalido || error instanceof CampoQtdMinima || error instanceof CampoQtdMaxima) {
            status = 400;
        }

        if(error instanceof FormatoInvalido) {
            status = 406;
        }

        res.status(status).send(
            serializarErro.transformar({
                id: error.idError,
                mensagem: error.message
            })
        )
    })
    
    return app;
}