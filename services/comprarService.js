const PagamentoError = require('../errors/pagamentoError');
const TransacaoDTO = require('../dtos/transacaoDTO');

module.exports = app => ({
    comprar: app.commons.wrap.handlerExceptionService(async compra =>
        app.clients.gatewayClient.debitar(compra.cartao)
            .then(estado => {
                app.services.produtoService.detalhe(compra.produto_id).then(produto => {
                    const valorTotal = produto.valor_unitario * compra.qtde_comprada;
                    app.services.transacaoService.adicionar(new TransacaoDTO(compra.produto_id, valorTotal, estado));
                });
                if (estado === 'APROVADO') {
                    app.services.produtoService.baixarEstoque(compra.produto_id, compra.qtde_comprada);
                } else {
                    throw new PagamentoError(estado);
                }
            })),
});
