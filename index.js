const express = require('express');
const parser = require('body-parser');
const consign = require('consign');
const promiseRouter = require('express-promise-router')();

// Express
const app = express();
app.use(parser.json());
app.use(promiseRouter);
//

// Consign
consign()
    .include('config')
    .then('commons')
    .then('repositories')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);
//

// Error handling
app.use((error, req, res, next) => {
    app.config.validation.trataErroGenerico(res, error);
});
//
