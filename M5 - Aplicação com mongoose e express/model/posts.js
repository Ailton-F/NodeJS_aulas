const mongoose = require('mongoose')
const schema = mongoose.Schema

const postsSchema = new schema ({
    titulo: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type:String,
        required:true
    },
    conteudo: {
        type: String,
        require:true
    },
    categoria:{
        type: schema.Types.ObjectId,
        ref: 'categorias',
        required:true
    },
    data: {
        type:Date,
        default:Date.now()
    }
})

mongoose.model('posts', postsSchema)