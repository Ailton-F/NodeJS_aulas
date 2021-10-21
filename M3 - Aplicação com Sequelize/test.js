const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistema_de_cadastro', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('Concetado com sucesso')
}).catch(function(erro){
    console.log(`Falha ao se conectar: ${erro}`)
})

const post = sequelize.define('Postagens', {
    titulo:{
        type: Sequelize.STRING
    },
    conteudo:{
        type: Sequelize.TEXT
    }
})

post.create({
    titulo: 'Lorem Ipsum',
    conteudo: 'Lorem ipsum sit amet dolor'
})

//post.sync({force: true}).then(()=>{
//   console.log('Sincronizado com sucesso')
//}).catch(function(error){
//    console.log(`Falha ao sincronizar: ${error}`)
//})

const user = sequelize.define('Usuarios', {
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    }
})

user.create({
    nome: 'Ailton',
    sobrenome: 'Borges',
    idade: 17,
    email: 'ailtonxdz@gmail.com'
})
    
//user.sync({force: true}).then(()=>{
//    console.log('Sincronizado com sucesso')
//}).catch(function(error){
//    console.log(`Falha ao sincronizar: ${error}`)
//})
