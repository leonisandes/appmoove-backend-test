module.exports = app => ({
    adicionar: app.commons.wrap.handlerExceptionService(async (transacao) =>
        app.repositories.transacaoRepository.adicionar(transacao)),
});
