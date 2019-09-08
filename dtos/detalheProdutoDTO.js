class DetalheProdutoDTO {

    constructor(nome, valorUnitario, qtdeEstoque, valorUltimaVenda) {
        this.nome = nome;
        this.valor_unitario = valorUnitario;
        this.qtde_estoque = qtdeEstoque;
        this.valor_ultima_venda = valorUltimaVenda;
    }

}

module.exports = DetalheProdutoDTO;
