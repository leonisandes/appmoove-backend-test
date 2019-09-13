const express = require('express');
const parser = require('body-parser');
const consign = require('consign');
const promiseRouter = require('express-promise-router')();
const ValidationError = require('./errors/validationError');

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
    .then('clients')
    .then('controllers')
    .then('routes')
    .into(app);
//

// Error handling
app.use((error, req, res, next) => {
    if (error instanceof ValidationError) {
        app.commons.validation.trataErroDeValidacao(res, error);
    } else {
        app.commons.validation.trataErroGenerico(res, error);
    }
});
//
