const ProdutoDTO = require('../dtos/produtoDTO');
const DetalheProdutoDTO = require('../dtos/detalheProdutoDTO');
const SemEstoqueError = require('../errors/semEstoqueError');

module.exports = app => ({
    adicionar: app.commons.wrap.handlerExceptionService(async produto => app.repositories.produtoRepository.adicionar(produto)),
    listar: app.commons.wrap.handlerExceptionService(async () => app.repositories.produtoRepository.listar()
        .then(produtos => produtos.map(p => new ProdutoDTO(p.nome, p.valor_unitario, p.qtde_estoque)))),
    detalhe: app.commons.wrap.handlerExceptionService(async id => app.repositories.produtoRepository.detalhe(id)
        .then(detalhe => new DetalheProdutoDTO(detalhe.nome, detalhe.valor_unitario, detalhe.qtde_estoque, detalhe.valorUltimaVenda))),
    baixarEstoque: app.commons.wrap.handlerExceptionService(async (id, quantidade) => {
        this.buscar(id).then(produto => {
            const produtoClone = produto;
            if (produtoClone.qtde_estoque >= quantidade) {
                produtoClone.qtde_estoque -= quantidade;
                console.log(`Produto clone: ${JSON.stringify(produtoClone)}`);
                app.repositories.produtoRepository.atualizar(produtoClone);
            } else {
                throw new SemEstoqueError();
            }
        });
    }),
    buscar: app.commons.wrap.handlerExceptionService(async id =>
        app.repositories.produtoRepository.buscar(id).then(p => new ProdutoDTO(p.nome, p.valor_unitario, p.qtde_estoque))),
    validarEstoque: app.commons.wrap.handlerExceptionService(async (id, quantidade) =>
        app.repositories.produtoRepository.buscar(id).then(p => { if (p.qtde_estoque < quantidade) throw SemEstoqueError(); })),
});
