const { transaction } = require('objection');
const ProdutoModel = require('../models/produtoModel');

module.exports = () => ({
    adicionar: async produto => transaction(ProdutoModel.knex(), trx => (
        ProdutoModel.query(trx).insertGraph(produto)
    )),
    listar: async () => transaction(ProdutoModel.knex(), trx => (
        ProdutoModel.query(trx)
            .whereNull('data_exclusao')
            .orderBy('id')
    )),
    detalhe: async id => transaction(ProdutoModel.knex(), trx => (
        ProdutoModel
            .query(trx)
            .where('id', id)
            .whereNull('data_exclusao')
            .select([
                'produtos.*',
                ProdutoModel.relatedQuery('transacoes')
                    .select('valor_venda')
                    .orderBy('data_venda')
                    .limit(1)
                    .as('valorUltimaVenda'),
            ])
            .first()
    )),
    buscar: async id => transaction(ProdutoModel.knex(), trx => (
        ProdutoModel
            .query(trx)
            .where('id', id)
            .whereNull('data_exclusao')
            .first()
    )),
    atualizar: async produto => transaction(ProdutoModel.knex(), trx => (
        ProdutoModel.query(trx).findById(produto.id).patch(produto)
    )),
});
