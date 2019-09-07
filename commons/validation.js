const { check, validationResult } = require('express-validator');
const MensagemDTO = require('../dtos/mensagemDTO');

module.exports = () => ({
    hasErrors: req => new Promise((resolve, reject) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorObject = { statusCode: 412, errors: errors.array() };
            reject(errorObject);
        } else {
            resolve();
        }
    }),
    adicionarProdutosValidation: () => [
        check('nome', 'Necessário informar o nome do produto, com tamanho do nome deve conter entre 1 e 45.').isLength({ min: '1', max: '45' }),
        check('valor_unitario', 'Necessário informar o valor unitário (tipo numérico) o valor deve estar entre 0.01 e 99999999.99.').isFloat({ min: 0.01, max: 99999999.99 }),
        check('qtde_estoque', 'Necessário informar o quantidade de estoque (tipo inteiro) o valor deve ser maior ou igual a 1.').isInt({ min: 1 }),
    ],
    trataErroGenerico: (res, err) => {
        res.status(400).json(new MensagemDTO(err.message));
    },
});
