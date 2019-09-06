const { transaction } = require('objection');
const ProdutoModel = require('../models/produtoModel');

module.exports = () => ({
    adicionar: async produto => {
        try {
            return await transaction(ProdutoModel.knex(), trx => (
                ProdutoModel.query(trx).insertGraph(produto)
            ));
        } catch (e) {
            throw e;
        }
    },
    listar: async () => {
        try {
            return await transaction(ProdutoModel.knex(), trx => (
                ProdutoModel.query(trx).orderBy('id')
            ));
        } catch (e) {
            throw e;
        }
    },
});
