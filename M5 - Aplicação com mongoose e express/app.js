// Imports dos módulos
    const express = require('express')
    const app = express()
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash  = require('connect-flash')

// Assets 
    //Session Flash
        app.use(session({
            secret: 'key1',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())

    //Middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.err_msg = req.flash('err_msg')  
            next()  
        })

    // body-parser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())

    // handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    
    // mongosse
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blog').then(()=>{
            console.log('Conectado ao mongo')
        }).catch((err)=>{
            console.log(`Falha ao conectar: ${err}`);
        })

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