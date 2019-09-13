const CustomError = require('./customError');

class CompraError extends CustomError {

    constructor(estado) {
        super(`Erro ao realizar a compra no cartão de credito. Estado da compra ${estado}`, 400);
    }

}

module.exports = CompraError;
