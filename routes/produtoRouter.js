module.exports = (app) => {
    const CONTEXT = '/api/produtos';
    const controller = app.controllers.produtoController;

    app.post(CONTEXT, app.commons.validation.validacaoAdicionarProduto(), app.commons.wrap.handlerExceptionController(async (req, res) => {
        await controller.adicionar(req, res);
    }));
    app.get(CONTEXT, app.commons.wrap.handlerExceptionController(async (req, res) => {
        await controller.listar(req, res);
    }));
    app.get(`${CONTEXT}/:produto_id`, app.commons.wrap.handlerExceptionController(async (req, res) => {
        await controller.detalhe(req, res);
    }));
};
