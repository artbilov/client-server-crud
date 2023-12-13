const http = require('http');
const { createServer } = http;
const port = 1234;
const { handleApi, handleFile } = require('./handlers.js');

const server = createServer((req, res) => {
  if (req.url.startsWith('/api/')) handleApi(req, res)
  else handleFile(req, res)
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})