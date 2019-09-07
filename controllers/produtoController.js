module.exports = app => ({
    adicionar: (req, res) => {
        app.commons.validation.hasErrors(req)
            .then(async () => {
                try {
                    const produtoCriado = await app.services.produtoService.adicionar(req.body);
                    res.send(produtoCriado);
                } catch (err) {
                    app.config.validation.trataErroGenerico(res, err);
                }
            })
            .catch(err => {
                res.status(err.statusCode).json(err);
            });
    },
    listar: async (req, res) => {
        const produtos = await app.services.produtoService.listar();
        res.status(200).send(produtos);
    },
});
