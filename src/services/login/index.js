const { criarToken } = require('../../shared/gerarToken');

module.exports = {
    login: (req, res) => {
        const accessToken = criarToken(req.user);
        res.set('Authorization', accessToken);
        res.status(200).send();
    }
}