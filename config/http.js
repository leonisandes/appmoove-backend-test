const http = require('http');

const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

module.exports = (app) => http.createServer(app)
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    })