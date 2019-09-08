const { Model } = require('objection');
const knex = require('../config/knex');
const ProdutoModel = require('./produtoModel');

Model.knex(knex);

class TransacaoModel extends Model {

    static get tableName() {
        return 'transacoes';
    }

    $beforeInsert() {
        this.data_venda = new Date();
    }

    static get relationMappings() {
        return {
            produtos: {
                relation: Model.BelongsToOneRelation,
                modelClass: ProdutoModel,
                join: {
                    from: 'transacoes.produto_id',
                    to: 'produtos.id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            require: ['produto_id', 'valor_venda', 'data_venda', 'estado'],
            properties: {
                id: { type: 'integer' },
                produto_id: { type: 'integer' },
                valor_venda: { type: 'number' },
                data_venda: { type: ' string' },
                estado: { type: ' string' },
            },
        };
    }

}

module.exports = TransacaoModel;
