module.exports = (app) => {
    const CONTEXT = '/api/produtos';
    const controller = app.produto.produtoController;

    app.post(CONTEXT, app.config.validation.adicionarProdutosValidation(), async (req, res) => {
        controller.adicionar(req, res);
    });
};
