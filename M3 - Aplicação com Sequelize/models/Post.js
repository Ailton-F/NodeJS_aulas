const db = require('./db')

const Post = db.sequelize.define('Postagens', {//Cria uma nova tabela no banco de dados
    titulo:{
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
})

//Post.sync({force:true}) Sincroniza a tabela criada

module.exports = Post