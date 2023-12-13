module.exports = { handleApi, handleFile }

const users = ['vasya', 'petya', 'masha', 'kolya', 'olya', 'katya', 'oleg', 'andrey', 'munirat']

async function handleApi(req, res) {
  const path = req.url.slice(5)
  const body = await getBody()


  if (path === 'users') {
    if (req.method === 'GET') {
      res.end(JSON.stringify(users))
    }
    if (req.method === 'POST') {



      users.push(JSON.parse(body))
      res.end(JSON.stringify(users))
    }
    if (req.method === 'PUT') {
      users[indexOf(req.name)] = req.newName
      // или
      // users.splice(indexOf(req.name), 1, req.newName)
      res.end(JSON.stringify(users))
    }
    if (req.method === 'DELETE') {
      users.splice(users.indexOf(req.name), 1)
      res.end(JSON.stringify(users))
    }
  }
}

  function handleFile(req, res) {
    const path = './public/' + (req.url.slice(1) || 'index.html')
    try {
      res.setHeader('Content-Type', mimeTypeDict[extname(path)])
      res.end(fs.readFileSync(path))
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  }


const fs = require('fs');
const { extname } = require('path')
const { mimeTypeDict } = require('./mime-types.js')

