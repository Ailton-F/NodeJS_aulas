//O express me permite usar o módulo html
const express = require('express')
const app = express()

//O handlebars me permite criar templates de html
const handlebars = require('express-handlebars')

//O body-parser me permite pegar uma informação de um input do html
const bodyParser =  require('body-parser')

//Pego o método Post do meu arquivo
const Post = require('./models/Post')
// Config
  //template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
  
  //BodyParser
    //configurando o body-parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

//Rotas
    app.get('/', function(req, res){
      res.render('home')
    })

    app.get('/cad', function(req, res){//O método getcria uma sequência de consulta(query string) e a acrescenta à URL do script no servidor que manipula a solicitação.
      res.render('formulario')//O 'render' renderiza o html do handlebars
    })

    app.post('/add', function(req, res){//O método Post cria um par nome/valor que são passados no corpo da mensagem de pedido HTTP.
      Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
      }).then(()=>{
        res.redirect('/')//'redirect' me direciona a uma rota
      }).catch(function(error){
        res.send(`Falha ao criar: ${error}`)
      })
    })

app.listen(8081, () => { //inícia o servidor na porta inserida
  console.log('Servidor rodando na url http://localhost:8081');
})
