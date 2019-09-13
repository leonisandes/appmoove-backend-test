const ProdutoDTO = require('../dtos/produtoDTO');
const DetalheProdutoDTO = require('../dtos/detalheProdutoDTO');
const SemEstoqueError = require('../errors/semEstoqueError');
const ProdutoNaoEncontradoError = require('../errors/produtoNaoEncotradoError');

module.exports = app => ({
    adicionar: app.commons.wrap.handlerExceptionService(async produto => app.repositories.produtoRepository.adicionar(produto)),
    listar: app.commons.wrap.handlerExceptionService(async () => app.repositories.produtoRepository.listar()
        .then(produtos => produtos.map(p => new ProdutoDTO(p.nome, p.valor_unitario, p.qtde_estoque)))),
    detalhe: app.commons.wrap.handlerExceptionService(async id => app.repositories.produtoRepository.detalhe(id)
        .then(detalhe => new DetalheProdutoDTO(detalhe.nome, detalhe.valor_unitario, detalhe.qtde_estoque, detalhe.valorUltimaVenda))),
    baixarEstoque: app.commons.wrap.handlerExceptionService(async (id, quantidade) =>
        app.services.produtoService.validarEstoque(id, quantidade)
            .then(produto => {
                const produtoClone = produto;
                produtoClone.qtde_estoque -= quantidade;
                app.repositories.produtoRepository.atualizar(produtoClone);
            })),
    buscar: app.commons.wrap.handlerExceptionService(async id =>
        app.repositories.produtoRepository.buscar(id)
            .then(p => {
                if (!p) throw new ProdutoNaoEncontradoError();
                return new ProdutoDTO(p.nome, p.valor_unitario, p.qtde_estoque);
            })),
    validarEstoque: app.commons.wrap.handlerExceptionService(async (id, quantidade) =>
        app.repositories.produtoRepository.buscar(id).then(p => {
            if (p.qtde_estoque < quantidade) throw new SemEstoqueError(); else return p;
        })),
    remover: app.commons.wrap.handlerExceptionService(async id =>
        app.services.produtoService.buscar(id).then(async p => {
            const produtoClone = p;
            produtoClone.id = parseInt(id);
            produtoClone.data_exclusao = new Date();
            app.repositories.produtoRepository.atualizar(produtoClone);
        }).catch(err => {
            console.warn(`Erro ao tentar localizar produto para remoção: ${err}`);
        })),
});
