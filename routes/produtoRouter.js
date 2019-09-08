const wrap = fn => (...args) => fn(...args).catch(e => args[2](e));

module.exports = (app) => {
    const CONTEXT = '/api/produtos';
    const controller = app.controllers.produtoController;

    app.post(CONTEXT, app.commons.validation.validacaoAdicionarProduto(), wrap (async (req, res) => {
        await controller.adicionar(req, res);
    }));
    app.get(CONTEXT, wrap(async (req, res) => {
        await controller.listar(req, res);
    }));
    app.get(`${CONTEXT}/:produto_id`, wrap(async (req, res) => {
        await controller.detalhe(req, res);
    }));
};
