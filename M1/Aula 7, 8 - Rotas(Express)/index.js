const express = require('express')
const app = express()

app.get('/', function(req, res){
  res.send('Bem vindo ao meu Servidor')//envia o código para o server
})

app.get('/sobre', function(req, res){
  res.send('Bem vindo ao sobre')
})

app.get('/Blog', function(req, res){
  res.send('Bem vindo ao meu blog')
})

app.get('/ola/:cargo/:nome', function(req, res){//eu posso passar parâmetros, simplesmente colocando o ':'
  let params = req.params
  res.send(`<h1> Ola ${params.nome}</h1><h2>Seu cargo e ${params.cargo}</h2>`)
})//Você só pode usar 1 'send' por 'get'

app.listen(8081, () => { //inícia o servidor na porta inserida
  console.log('Servidor rodando na url http://localhost:8081');
})
