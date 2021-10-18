//O sequelize me conecta com o banco de dados
const Sequelize = require('sequelize')
//Primeiro eu defino o bd que quero usar, depois passo o usuário e a senha, depois o server e depois a linguagem
const sequelize = new Sequelize('sistema_de_cadastro', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

//Conexão com o bd mysql
  sequelize.authenticate().then(()=>{//'Then' significa: se conseguir faça isso
    console.log('Concetado com sucesso')
}).catch(function(erro){//'Catch significa: se não conseguir faça isso
    console.log(`Falha ao se conectar: ${erro}`)
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}