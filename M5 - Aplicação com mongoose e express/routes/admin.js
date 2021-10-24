const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../model/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.render('admin/categorias')
})

router.get('/categorias', (req, res)=>{
    Categoria.find().sort({date:'desc'}).then((categorias)=>{
        res.render('admin/categorias',{categorias:categorias.map(categorias => categorias.toJSON())})
    }).catch((err)=>{
        req.flash('err_msg', 'Houve um erro ao listar a categoria')
        res.redirect('/admin')
    })
    //res.render('admin/categorias') NUNCA USE O 'Res.send' 2 VEZES
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategoria')
})

router.post('/categorias/nova', (req, res)=>{
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

router.get('/categorias/edit/:id', (req, res)=>{
    Categoria.findOne({_id: req.params.id}).lean().then((categorias)=>{
        res.render('admin/editcategorias',{categorias:categorias})
    }).catch((err)=>{
        req.flash('err_msg', `Essa categoria não existe`)
        res.redirect('/admin/categorias')
    })
})


router.post('/categorias/edit', (req, res)=>{
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

router.post('/categorias/edit/delet', (req, res) => {
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

module.exports = router 