const CustomError = require('./customError');

class SemEstoqueError extends CustomError {

    constructor() {
        super('Sem estoque para o produto.', 400);
    }

}

module.exports = SemEstoqueError;
