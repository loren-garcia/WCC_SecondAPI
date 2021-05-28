class NaoEncontrado extends Error {
    constructor(model) {
        const mensagem = `${model} não encontrado`;
        super(mensagem);
        this.name = 'NaoEncontrado';
        this.IdError = 5;
    }
}

module.exports = NaoEncontrado;