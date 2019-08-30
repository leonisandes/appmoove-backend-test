const express = require('express');
const parser = require('body-parser');
const consign = require('consign');

// Express
const app = express();
app.use(parser.json());
//

// Consign
consign()
    .include('config')
    .then('produto')
    .into(app);
//
