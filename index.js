const http = require('http');
const express = require('express');
const parser = require('body-parser');
const dotenv = require('dotenv-safe');

// Dotenv
dotenv.config({
    allowEmptyValues: true,
    path: isProductionMode() ? '.env' : '.env.dev',
});

if (isProductionMode()) {
    console.log('Executing in production mode.');
} else {
    console.log('Executing in development mode.');
}
//

// Express
const app = express();
app.use(parser.json());
//

// Http
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
http.createServer(app)
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
//

// Helpers functions
function isProductionMode() { return process.env.NODE_ENV === 'PROD'; }
//
