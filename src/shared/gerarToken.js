const jwt = require('jsonwebtoken');

function criarToken(usuario) {
    const payload = {
        id: usuario.id
    };
    return jwt.sign(payload, 'segredo');
}

module.exports = {
    criarToken
}