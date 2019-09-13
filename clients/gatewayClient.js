const axios = require('axios');

module.exports = () => ({
    debitar: cartao => axios({
        method: 'post',
        url: process.env.GATEWAY_URL,
        data: cartao,
    }).then(response => response.data.estado),
});
