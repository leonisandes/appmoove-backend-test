const http = require('http');

const port = process.env.PORT;

module.exports = (app) => http.createServer(app)
    .listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
