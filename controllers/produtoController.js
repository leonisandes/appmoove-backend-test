function trataMensagemDeErro(res, err) {
    res.status(400).json({ message: err.message });
}

module.exports = app => ({
    adicionar: (req, res) => {
        app.config.validation.hasErrors(req)
            .then(async () => {
                try {
                    const produtoCriado = await app.services.produtoService.adicionar(req.body);
                    res.send(produtoCriado);
                } catch (err) {
                    trataMensagemDeErro(res, err);
                }
            })
            .catch(err => {
                res.status(err.statusCode).json(err);
            });
    },
    listar: async (req, res) => {
        try {
            const produtos = await app.services.produtoService.listar();
            res.status(200).send(produtos);
        } catch (err) {
            trataMensagemDeErro(res, err);
        }
    },
});
