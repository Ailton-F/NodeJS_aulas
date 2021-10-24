const mongoose = require('mongoose')
const schema = mongoose.Schema

const categoriaSchema = new schema({
    nome: {
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categorias', categoriaSchema)