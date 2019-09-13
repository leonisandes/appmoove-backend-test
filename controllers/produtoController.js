const MenssagemDTO = require('../dtos/mensagemDTO');

module.exports = app => ({
    adicionar: async (req, res) => {
        app.commons.validation.hasErrors(req);

        await app.services.produtoService.adicionar(req.body);
        res.status(201).send(new MenssagemDTO('Produto cadastrado'));
    },
    listar: async (req, res) => {
        const produtos = await app.services.produtoService.listar();
        res.status(200).send(produtos);
    },
    detalhe: async (req, res) => {
        const detalheProduto = await app.services.produtoService.detalhe(req.params.produto_id);
        res.status(200).send(detalheProduto);
    },
    remover: async (req, res) => {
        await app.services.produtoService.remover(req.params.produto_id);
        res.status(204).send(new MenssagemDTO('Produto excluído com sucesso'));
    },
});
