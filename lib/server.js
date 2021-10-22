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

        switch (httpMethod) {
            case 'get':
                const countryContent = await data.read('countries', trimmedPath);
                responseContent = JSON.stringify(countryContent);
                break;

            case 'post':
                responseContent = 'POST country';
                break;

            case 'put':
                responseContent = 'PUT country';
                break;

            case 'delete':
                responseContent = 'DELETE country';
                break;

            default:
                responseContent = 'KLAIDA: netinkamas request method\'as';
                break;
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