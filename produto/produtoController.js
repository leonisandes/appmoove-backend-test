module.exports = app => ({
    adicionar: (req, res) => {
        app.config.validation.hasErrors(req)
            .then(async () => {
                try {
                    const produtoCriado = await app.produto.produtoService.adicionar(req.body);
                    res.send(produtoCriado);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.statusCode).json(err);
            });
    },
});
