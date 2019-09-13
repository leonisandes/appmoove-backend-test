const axios = require('axios');
const CompraError = require('../errors/compraError');

module.exports = () => ({
    debitar: async cartao => axios({
        method: 'post',
        url: process.env.GATEWAY_URL,
        data: cartao,
    })
        .then(response => response.data.estado)
        .catch(err => {
            console.error(`Erro ao realizar comunicação com o gateway de pagamento: ${err}`);
            throw new CompraError();
        }),
});
