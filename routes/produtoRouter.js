module.exports = (app) => {
    const CONTEXT = '/api/produtos';
    const controller = app.controllers.produtoController;

    app.post(CONTEXT, app.config.validation.adicionarProdutosValidation(), async (req, res) => {
        controller.adicionar(req, res);
    });
    app.get(CONTEXT, async (req, res) => {
        controller.listar(req, res);
    });
};
