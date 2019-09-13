const MenssagemDTO = require('../dtos/mensagemDTO');

module.exports = app => ({
    comprar: async (req, res) => {
        app.commons.validation.hasErrors(req);

        await app.services.comprarService.comprar(req.body);
        res.status(201).send(new MenssagemDTO('Venda realizada com sucesso'));
    },
});
