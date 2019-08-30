const Model = require('objection');

class Produto extends Model {

    static get tableName() {
        return 'produtos';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            require: [''],
            properties: {
                id: { type: 'integer' },
                nome: { type: 'string', minLength: 1, maxLength: 255 },
                valorUnitario: { type: 'number' },
                qtdEstoque: { type: 'integer' },
            },
        };
    }

}

module.exports = Produto;
