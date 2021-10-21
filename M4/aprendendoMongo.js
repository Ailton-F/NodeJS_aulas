const mongoose = require('mongoose')

//Config do mongoose
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/novo_banco").then(()=>{//conectando com o banco de dados
        console.log('Conectado com sucesso!')
    }).catch((error)=>{
        console.log(`Houve um erro ao se conectar com o MongoDb: ${error}`)
    })

//Model - Usuários
//Definindo o model
    //Bom modos: Usar o síngular e usar a palavra 'Schema' como sufixo da variavel 
    const userSchema = mongoose.Schema({// Tipos do mongo são so mesmos do JS, ex.: String | Object | Number | Date
        nome:{
            type:String,
            require: true//Torna o campo obrigatorio
        },
        sobrenome: {
            type:String,
            require:true
        },
        email: {
            type:String,
            require:true
        },
        idade:{
            type:Number,
            require:true
        },
        pais:{
            type:String,
            require:true
        }
    }) 
// Collection
    mongoose.model('Users', userSchema)
    const user = mongoose.model('Users')

    new user({//Criando um novo resgistro
        nome: 'Bianca',
        sobrenome: 'Bezerra',
        email: 'biancabp@gmail.com',
        idade: 16,
        pais: 'Brasil'
    }).save().then(()=>{
        console.log('Registrado com sucesso!')
    }).catch((err)=>{
        console.log(`Erro ao registrar: ${err}`)
    })