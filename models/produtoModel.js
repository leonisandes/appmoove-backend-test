const { Model } = require('objection');
const knex = require('../config/knex');
const TransacaoModel = require('./transacaoModel');

Model.knex(knex);

class ProdutoModel extends Model {

    static get tableName() {
        return 'produtos';
    }

    $beforeInsert() {
        this.data_criacao = new Date();
        this.data_atualizacao = new Date();
    }

    $beforeUpdate() {
        this.data_atualizacao = new Date();
    }

    static get relationMappings() {
        return {
            transacoes: {
                relation: Model.BelongsToOneRelation,
                modelClass: TransacaoModel,
                join: {
                    from: 'produtos.id',
                    to: 'transacoes.produto_id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            require: ['nome', 'valor_unitario', 'qtde_estoque', 'data_criacao', 'data_atualizacao'],
            properties: {
                id: { type: 'integer' },
                nome: { type: 'string', minLength: 1, maxLength: 255 },
                valor_unitario: { type: 'number' },
                qtde_estoque: { type: 'integer' },
                data_criacao: { type: ' string' },
                data_atualizacao: { type: ' string' },
                data_exclusao: { type: ' string' },
            },
        };
    }

}

module.exports = ProdutoModel;
