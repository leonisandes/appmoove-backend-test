module.exports = app => {
    const CONTEXT = '/api/compras';
    const controller = app.controllers.comprarController;

    app.post(
        CONTEXT,
        app.commons.validation.validacaoComprarProduto(),
        app.commons.wrap.handlerExceptionController(async (req, res) => {
            await controller.comprar(req, res);
        })
    );
};
