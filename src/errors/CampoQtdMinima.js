class CampoQtdMinima extends Error {
    constructor(campo) {
        const mensagem = `O campo ${campo} não possui a quantidade mínima de 3 caracteres`;
        super(mensagem);
        this.name = 'CampoQtdMinima';
        this.idError = 8;
    }
}

module.exports = CampoQtdMinima;