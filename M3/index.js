const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistema_de_cadastro', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

// Config
  //template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

  //Conexão com o bd mysql
    sequelize.authenticate().then(()=>{
      console.log('Concetado com sucesso')
    }).catch(function(erro){
      console.log(`Falha ao se conectar: ${erro}`)
    })

//Rotas
    app.get('/cad', function(req, res){
      res.render('formulario')
    })

    app.post('/add', function(req, res){
      res.send('FORMULÁRIO RECEBIDO')
    })

app.listen(8081, () => { //inícia o servidor na porta inserida
  console.log('Servidor rodando na url http://localhost:8081');
})
