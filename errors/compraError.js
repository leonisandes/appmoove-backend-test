const CustomError = require('./customError');

class CompraError extends CustomError {

    constructor() {
        super('Erro ao se comunicar com o gateway de pagamento.', 400);
    }

}

module.exports = CompraError;
