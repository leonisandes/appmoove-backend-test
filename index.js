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
    .then('repositories')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);
//
