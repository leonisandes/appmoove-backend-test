const http = require('http');

const hostname = process.env.HOST;
const port = process.env.PORT;

module.exports = (app) => http.createServer(app)
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
