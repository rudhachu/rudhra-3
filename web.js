const http = require('http');

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('𝗕𝗢𝗧 𝗦𝗧𝗔𝗥𝗧𝗘𝗗!');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
