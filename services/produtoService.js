const ProdutoDTO = require('../dtos/produtoDTO');
const DetalheProdutoDTO = require('../dtos/detalheProdutoDTO');

function lancaOErroELoga(e) {
    console.error(`Ocorreu um erro ao adicionar produto: ${e}`);
    // TODO: Ajustar mensagem igual a documentação
    throw Error('Algum problema inesperado aconteceu, não se preocupe estamos atuando...');
}
// TODO: refactory criar um wrap para tratar a mensagem de erro
module.exports = app => ({
    adicionar: async produto => {
        try {
            return await app.repositories.produtoRepository.adicionar(produto);
        } catch (e) {
            throw lancaOErroELoga(e);
        }
    },
    listar: async () => {
        try {
            return await app.repositories.produtoRepository.listar()
                .then(produtos => produtos.map(p => new ProdutoDTO(p.nome, p.valor_unitario, p.qtde_estoque)));
        } catch (e) {
            throw lancaOErroELoga(e);
        }
    },
    detalhe: async id => {
        try {
            return await app.repositories.produtoRepository.detalhe(id)
                .then(detalhe => new DetalheProdutoDTO(detalhe.nome, detalhe.valor_unitario, detalhe.qtde_estoque, detalhe.valorUltimaVenda));
        } catch (e) {
            throw lancaOErroELoga(e);
        }
    },
});
