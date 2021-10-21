// Imports dos módulos
    const express = require('express')
    const app = express()
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const path = require('path')
    //const mongoose = require('mongoose')

// Assets 
    // body-parser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())

    // handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    
    // mongosse
        //Loading...

    // Public
        app.use(express.static(path.join(__dirname,'public')))
// Routes
    const admin = require('./routes/admin')
    app.use('/admin', admin)
// Misc
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Server opened! ')
})