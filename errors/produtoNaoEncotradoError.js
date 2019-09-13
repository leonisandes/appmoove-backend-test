const CustomError = require('./customError');

class ProdutoNaoEncontradoError extends CustomError {

    constructor() {
        super('O produto informado não existe.', 400);
    }

}

module.exports = ProdutoNaoEncontradoError;
