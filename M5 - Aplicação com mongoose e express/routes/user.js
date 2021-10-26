const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../model/Users")
const users = mongoose.model('Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/registro', (req, res)=>{
    res.render('users/registro')
})

router.post('/registro', (req, res)=>{
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 3){
        erros.push({text:'Nome inválido'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({text:'E-mail inválido'})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 4){
        erros.push({text:'Senha inválida ou muito curta'})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({text:'Senhas diferentes, tente novamente'})
    }

    if(erros.length > 0){
        res.render('users/registro', {erros:erros})
    } else {
        users.findOne({email:req.body.email}).then((user)=>{
            if(user){
                req.flash('err_msg', 'Email já cadastrado')
                rs.redirect('/users/resgistro')
            } else {

                const newUser = new users({
                    nome: req.body.nome,
                    email:req.body.email,
                    senha:req.body.senha,
                    //eAdmin: 1
                })

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.senha, salt, (err, hash)=>{
                        if(err){
                            req.flash('err_msg', 'Houve um erro durante o salvamento do usuario')
                            res.redirect('/')
                        } else {
                            newUser.senha = hash
                            newUser.save((err, result)=>{
                                if(err){
                                    req.flash('err_msg', 'Erro ao salvar usuário')
                                    res.redirect('/')
                                } else {
                                    req.flash('success_msg', 'Usuário salvo com sucesso!')
                                    res.redirect('/users/registro')
                                }
                            })
                        }
                    })
                })
            }
        }).catch((err)=>{
            req.flash('err_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    }
})

router.get('/login', (req, res)=>{
    res.render("users/login")
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/user/login',
        failureFlash:true
    })(req, res, next)
})

router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('success_msg', 'Deslogado')
    res.redirect('/')
})
module.exports = router