// Imports dos módulos
    const express = require('express')
    const app = express()
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash  = require('connect-flash')
    require('./model/posts')
    const Post = mongoose.model('posts')
    require('./model/Categoria')
    const Categoria = mongoose.model('categorias')

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

    app.get('/posts/:slug', (req, res)=>{
        Post.findOne({slug:req.params.slug}).lean().then(posts=>{
            if(posts){
                res.render('posts/index', {posts:posts})
            } else {
                req.flash('err_msg', 'Esse post não existe!')
                res.redirect('/')
            }
        }).catch((err)=>{
            req.flash('err_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    })

    app.get('/', (req, res) => {
        Post.find((err, posts) => {
            if(err){
                req.flash('err_msg', 'Houve um erro interno')
                res.redirect('/404')
                console.log(err);
            } else {
                res.render('index', {posts:posts})
            }
        }).lean().populate('categoria').sort({data:'desc'})
    })

    app.get('/categorias', (req, res) => {
        Categoria.find().lean().sort({date:'desc'}).then((categoria)=>{
            res.render('categorias/index', {categoria:categoria})
        }).catch((err)=>{
            req.flash('err_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    })

    app.get('/categorias/:slug', (req, res)=>{
        Categoria.findOne({slug:req.params.slug}).lean().then((categoria)=>{
            if(categoria){
                Post.find({categoria:categoria._id}).lean().then((posts)=>{
                    console.log(categoria);
                    res.render('categorias/posts', {posts:posts, categoria:categoria})
                }).catch((err)=>{
                    req.flash('err_msg', 'Houve um erro listar os posts')
                    res.redirect('/')
                })
            }else {
                req.flash('err_msg', 'Falha ao encontrar categoria')
                res.redirect('/')
            }
        }).catch((err)=>{
            req.flash('err_msg', 'Houve um erro interno ao carregar a página da categoria')
            res.redirect('/')
        })
    })

    app.get('/404', (req, res) => {
        res.send('ERRO 404!')
    })

    const admin = require('./routes/admin')
    app.use('/admin', admin)
    
// Misc
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Server opened! ')
})