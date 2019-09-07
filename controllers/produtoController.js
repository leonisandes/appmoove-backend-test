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
});
