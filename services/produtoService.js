const ProdutoDTO = require('../dtos/produtoDTO');

function lancaOErroELoga(e) {
    console.error(`Ocorreu um erro ao adicionar produto: ${e}`);
    throw Error('Algum problema inesperado aconteceu, não se preocupe estamos atuando...');
}

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
});
