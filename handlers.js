module.exports = { handleApi, handleFile }

async function handleApi(req, res) {
  const { url, method } = req
  const path = url.slice(5)
  const payload = JSON.parse(await getBody(req))

  if (path === 'users') {
    
    if (method === 'POST') {
      create(payload.item)
    } else 
    
    if (method === 'PUT') {
      try {
        update(payload.item, payload.newItem)
      } catch (error) {
        res.end(JSON.stringify({ error: error.message }))
        return
      }
    } else 
    
    if (method === 'DELETE') {
      try {
        remove(payload.item)
      } catch (error) {
        res.end(JSON.stringify({ error: error.message }))
        return
      }
    }

    res.end(JSON.stringify(read()))
  }
  console.log(read())
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

async function getBody(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  return body || 'null'
}


const fs = require('fs');
const { extname } = require('path')
const { mimeTypeDict } = require('./mime-types.js')
const { create, read, update, remove } = require('./crud.js')

