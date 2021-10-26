const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../model/Categoria')
const Categoria = mongoose.model('categorias')
require('../model/posts')
const Post = mongoose.model('posts')
const {eAdmin} = require('../helper/eAdmin')
    
router.get('/', eAdmin,(req, res)=>{
    res.render('admin/index')
})
//CATEGORIAS
    router.get('/categorias', eAdmin, (req, res)=>{
        Categoria.find().sort({date:'desc'}).then((categorias)=>{
            res.render('admin/categorias',{categorias:categorias.map(categorias => categorias.toJSON())})
        }).catch((err)=>{
            req.flash('err_msg', 'Houve um erro ao listar a categoria')
            res.redirect('/admin')
        })
        //res.render('admin/categorias') NUNCA USE O 'Res.send' 2 VEZES
    })

    router.get('/categorias/add', eAdmin, (req, res)=>{
        res.render('admin/addcategoria')
    })

    router.post('/categorias/nova', eAdmin, (req, res)=>{
        let errors = []
        //Nome errors    
            if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
                errors.push({text:'Nome inválido ou muito curto'})
            }
        //Slug errors
            if(!req.body.slug || typeof req.body.slug == undefined || req.body.nome == null){
                errors.push({text:'Slug inválido'})
            }
        //Render errors  
            if(errors.length > 0){
                res.render('admin/addcategoria', {errors: errors})
            } else {
                let slug = req.body.slug
                let low_slug = slug.toLowerCase()
                const novaCategoria = {
                    nome: req.body.nome,
                    slug: low_slug
                }
            
                new Categoria(novaCategoria).save().then(()=>{
                    req.flash("success_msg", 'Categoria criada com sucesso!')
                    res.redirect('/admin/categorias')
                }).catch((err)=>{
                    req.flash('err_msg', 'Houve um erro ao salvar a categoria')
                    res.redirect('/admin')
                })
            } 
    })

    router.get('/categorias/edit/:id', eAdmin, (req, res)=>{
        Categoria.findOne({_id: req.params.id}).lean().then((categorias)=>{
            res.render('admin/editcategorias',{categorias:categorias})
        }).catch((err)=>{
            req.flash('err_msg', `Essa categoria não existe`)
            res.redirect('/admin/categorias')
        })
    })


    router.post('/categorias/edit', eAdmin, (req, res)=>{
        Categoria.findOne({_id: req.body.id}, (error, result) => {
            if(error){
                req.flash('err_msg', 'Falha ao encontrar registro')
                res.redirect('/admin/categorias')
            } else {
                result.nome = req.body.nome
                let slug = req.body.slug
                let low_slug = slug.toLowerCase()
                result.slug = low_slug
                let errors = []
                //Nome errors    
                    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
                        errors.push(1)
                    }
                //Slug errors
                    if(!req.body.slug || typeof req.body.slug == undefined || req.body.nome == null){
                        errors.push(1)
                    }
                //Render errors  
                    if(errors.length > 0){
                        req.flash('err_msg', `Erro ao editar, nome ou slug inválido`,)
                        res.redirect(`/admin/categorias/edit/${req.body.id}`)
                    } else {
                        result.save((err) => {
                            if(err){
                                req.flash('err_msg', `Falha ao editar: ${err}`)
                            } else {
                                req.flash('success_msg', `Editado com sucesso!`)
                                res.redirect('/admin/categorias')
                            }
                        })
                    }
            }
        })
    })

    router.post('/categorias/edit/delet', eAdmin, (req, res) => {
        Categoria.findOneAndRemove({_id: req.body.id}, (err) => {
            if(err){
                req.flash('err_msg', `Erro ao deletar categoria: ${err}`)
                res.redirect('/admin/categorias')
            } else {
                req.flash('success_msg', 'Categoria deletada com sucesso!')
                res.redirect('/admin/categorias')
            }
        })
    })

//POSTS
    router.get('/posts', eAdmin,(req, res)=>{
        Post.find().populate("categoria").sort({data:'desc'}).then((posts)=>{
            res.render('admin/posts',{posts:posts.map(posts => posts.toJSON())})
        }).catch((err)=>{
            req.flash('err_msg', 'Houve um erro ao listar os posts')
            res.redirect('/admin')
        })
    })

    router.get('/posts/add', eAdmin,(req, res) => {
        Categoria.find((err, categorias)=>{
            if(err){
                req.flash('err_msg', 'Erro ao carregar formulário')
                res.redirect('/admin/posts')
            } else {
                res.render('admin/addpost',{categorias:categorias})
            }
        }).lean()
    })

    router.post('/posts/nova', eAdmin,(req, res) => {
        let error = []

        if(req.body.categoria == 0){
            error.push({text:'Categoria inválida, registre uma nova categoria'})
        }

        if(console.length > 0){
            res.render('admin/addpost', {error:error})
        }else{

            const newPost = {
                titulo: req.body.titulo,
                slug: req.body.slug,
                descricao: req.body.desc,
                conteudo: req.body.conteudo,
                categoria: req.body.categoria
            }

            new Post(newPost).save((err, result) => {
                if(err){
                    req.flash('err_msg', 'Erro ao criar post')
                    res.redirect("/admin/posts")
                } else {
                    req.flash('success_msg', 'Post criado com sucesso!')
                    res.redirect('/admin/posts')
                }
            })
        }
    })

    router.get('/posts/edit/:id', eAdmin,(req, res) => {
        Post.findOne({_id:req.params.id}, (err, post)=>{
            if(err){
                req.flash('err_msg', 'Houve um erro ao encontrar o post')
                res.redirect('/admin/posts')
            } else {
                Categoria.find((err, categorias)=> {
                    if(err){
                        req.flash('err_msg', 'Falha ao listar categorias')
                        res.redirect('/admin/posts')
                    }else{
                        res.render('admin/editposts', {categorias:categorias, post:post})
                    }
                }).lean()
            }
        }).lean()
    })

    router.post('/posts/edit', eAdmin,(req, res) => {
            Post.findOne({_id:req.body.id}, (err, post)=>{
                if(err){
                    req.flash('err_msg', 'Erro ao encontrar o post')
                    res.redirect('admin/posts')
                } else {
                    post.titulo = req.body.titulo
                    post.slug = req.body.slug
                    post.descricao = req.body.desc
                    post.conteudo = req.body.conteudo
                    post.categoria = req.body.categoria

                    post.save((err)=>{
                        if(err){
                            req.flash('err_msg', 'Houve um erro ao salvar a edição do post')
                        } else {
                            req.flash('success_msg', 'Post editado com sucesso!')
                            res.redirect('/admin/posts')
                        }
                    })
                }
            })
    })

    router.post('/post/edit/delet', (req, res) => {
        Post.findOneAndRemove({_id: req.body.id}, (err) => {
            if(err){
                req.flash('err_msg', `Erro ao deletar post: ${err}`)
                res.redirect('/admin/posts')
            } else {
                req.flash('success_msg', 'Post deletado com sucesso!')
                res.redirect('/admin/posts')
            }
        })
    })

module.exports = router 