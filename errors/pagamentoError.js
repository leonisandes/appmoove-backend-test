const CustomError = require('./customError');

class PagamentoError extends CustomError {

    constructor(estado) {
        super(`Erro ao realizar a pagamento no cartão de credito. Estado do pagamento ${estado}`, 400);
    }

}

module.exports = PagamentoError;
