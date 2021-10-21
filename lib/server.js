const http = require('http');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    console.log(req.method, ':', req.url);

    req.on('data', () => {
        console.log('dalinis uzklausos gavimas');
    })

    req.on('end', () => {
        res.end('Sveiki atvyke i musu Coutries API puslapi!');
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