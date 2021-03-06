const { check, validationResult, body } = require('express-validator');
const MensagemDTO = require('../dtos/mensagemDTO');
const ValidationError = require('../errors/validationError');
const Promise = require('bluebird');

module.exports = (app) => ({
    hasErrors: req => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Erro na validação da requisição.', errors.array(), 412);
        }
    },
    validacaoAdicionarProduto: () => [
        check('nome', 'Necessário informar o nome do produto, com tamanho do nome deve conter entre 1 e 45.').isLength({ min: '1', max: '45' }),
        check('valor_unitario', 'Necessário informar o valor unitário (tipo numérico) o valor deve estar entre 0.01 e 99999999.99.').isFloat({ min: 0.01, max: 99999999.99 }),
        check('qtde_estoque', 'Necessário informar o quantidade de estoque (tipo inteiro) o valor deve ser maior ou igual a 1.').isInt({ min: 1 }),
    ],
    trataErroGenerico: (res, err) => {
        res.status(400).json(new MensagemDTO(err.message));
    },
    trataErroDeValidacao: (res, err) => {
        res.status(err.statusCode).json(err);
    },
    validacaoComprarProduto: () => [
        body('produto_id').custom(produtoId => app.services.produtoService.buscar(produtoId).catch(() => Promise.reject('Produto não existe.'))),
        check('produto_id', 'Necessário informar o id do produto').isInt(1),
        body('qtde_comprada').custom((qtdeComprada, { req }) => app.services.produtoService.validarEstoque(req.body.produto_id, qtdeComprada).catch(() => Promise.reject('Estoque insuficiente.'))),
        check('qtde_comprada', 'Necessário informar a quantidade comprada do produto').isInt(1),
        check('cartao.titular', 'Necessário informar o nome do titular do cartão.').not().isEmpty(),
        check('cartao.numero', 'Necessário informar um numero de cartão valido.').isCreditCard(),
        check('cartao.data_expiracao', 'Necessário informar a data de expiração do cartão.').not().isEmpty(),
        check('cartao.bandeira', 'Necessário informar a bandeira do cartão.').not().isEmpty(),
        check('cartao.cvv', 'Necessário informar o CVV do cartão.').isInt().isLength(3),
    ],
});
