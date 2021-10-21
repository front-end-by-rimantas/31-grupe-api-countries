const http = require('http');
const data = require('./data.js');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    const httpMethod = req.method.toLowerCase();
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');

    req.on('data', () => {
        console.log('dalinis uzklausos gavimas');
    })

    req.on('end', async () => {
        let responseContent = '';

        if (httpMethod === 'get') {
            const countryContent = await data.read('countries', trimmedPath);
            responseContent = JSON.stringify(countryContent);
        } else if (httpMethod === 'post') {
            responseContent = 'POST country';
        } else if (httpMethod === 'put') {
            responseContent = 'PUT country';
        } else if (httpMethod === 'delete') {
            responseContent = 'DELETE country';
        } else {
            responseContent = 'KLAIDA: netinkamas request method\'as';
        }

        res.end(responseContent);
    })
});

server.routes = {};

server.api = {};

server.init = () => {
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    })
}

module.exports = server;