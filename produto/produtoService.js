module.exports = app => ({
    adicionar: async produto => {
        try {
            return await app.produto.produtoRepository.adicionar(produto);
        } catch (e) {
            console.error(`Ocorreu um erro ao adicionar protudo: ${e}`);
            throw Error('Algum problema inesperado aconteceu, não se preocupe estamos atuando...');
        }
    },
});
