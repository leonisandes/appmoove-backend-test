class TransacaoDTO {

    constructor(produtoId, valorVenda, estado) {
        this.produto_id = produtoId;
        this.valor_venda = valorVenda;
        this.estado = estado;
    }

}

module.exports = TransacaoDTO;
