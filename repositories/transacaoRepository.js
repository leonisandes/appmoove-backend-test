const { transaction } = require('objection');
const TransacaoModel = require('../models/transacaoModel');

module.exports = () => ({
    adicionar: async transacao => transaction(TransacaoModel.knex(), trx => (
        TransacaoModel.query(trx).insertGraph(transacao)
    )),
});
