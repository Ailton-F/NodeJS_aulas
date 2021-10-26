const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//User model
require('../model/Users')
const User = mongoose.model('Users')

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField:'senha'}, (email, senha, done)=>{
        User.findOne({email:email}).then((user)=>{
            if(!user){
                return done(null, false, {message: 'Essa conta não existe'})
            }
            bcrypt.compare(senha, user.senha, (err, batem) => {
                if(batem){
                    return(done(null, user))
                } else {
                    return(done(null, false, {message:"Senha incorreta"}))
                }
            })
        })
    }))
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, User)=>{
            done(err, User)
        })
    })
}