const CustomError = require('./customError');

class CompraError extends CustomError {

    constructor() {
        super('Sem estoque para o produto.', 400);
    }

}

module.exports = CompraError;
