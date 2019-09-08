const ProdutoDTO = require('../dtos/produtoDTO');
const DetalheProdutoDTO = require('../dtos/detalheProdutoDTO');

const wrap = fn => (...args) => fn(...args).catch(e => {
    console.error(`Ocorreu um erro desconhecido: ${e}`);
    throw Error('Ocorreu um erro desconhecido.');
});

module.exports = app => ({
    adicionar: wrap(async produto => app.repositories.produtoRepository.adicionar(produto)),
    listar: wrap(async () => app.repositories.produtoRepository.listar()
        .then(produtos => produtos.map(p => new ProdutoDTO(p.nome, p.valor_unitario, p.qtde_estoque)))),
    detalhe: wrap(async id => app.repositories.produtoRepository.detalhe(id)
        .then(detalhe => new DetalheProdutoDTO(detalhe.nome, detalhe.valor_unitario, detalhe.qtde_estoque, detalhe.valorUltimaVenda))),
});
