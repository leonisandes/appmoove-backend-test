const { transaction } = require('objection');
const ProdutoModel = require('../models/produtoModel');
// TODO: Ajustar os metodos adicionar e listar para ficarem parecidos com o detalhe não a necessidade do try catch
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
    detalhe: async id => transaction(ProdutoModel.knex(), trx => (
        ProdutoModel
            .query(trx)
            .where('id', id)
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
});
