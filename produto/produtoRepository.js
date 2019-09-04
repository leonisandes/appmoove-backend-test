const { transaction } = require('objection');

module.exports = (app) => ({
    adicionar: async produto => {
        try {
            const model = app.produto.produtoModel.instance;
            const produtoInserido = await transaction(model.knex(), trx => (
                model.query(trx).insertGraph(produto)
            ));
            return produtoInserido;
        } catch (e) {
            throw e;
        }
    },
});
