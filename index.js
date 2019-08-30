const http = require('http');
const express = require('express');
const parser = require('body-parser');
const dotenv = require('dotenv-safe');

dotenv.config({
    allowEmptyValues: true,
    path: process.env.NODE_ENV ? '.env' : '.env.dev',
});

if (process.env.NODE_ENV) {
    console.log('Executando em modo produção.');
} else {
    console.log('Executando em modo desenvolvimento.');
}

const hostname = '127.0.0.1';
const port = 8080;

const app = express();
app.use(parser.json());

http.createServer(app)
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
