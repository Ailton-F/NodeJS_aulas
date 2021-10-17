const express = require('express')
const app = express()

app.get('/', function(req, res){
  res.sendFile(`${__dirname}/html/index.html`)//envia um arquivo - res.sendFile(`${__dirname}`)
})

app.get('/sobre', function(req, res){
  res.sendFile(`${__dirname}/html/sobre.html`)
})

app.listen(8081, () => { //inícia o servidor na porta inserida
  console.log('Servidor rodando na url http://localhost:8081');
})
