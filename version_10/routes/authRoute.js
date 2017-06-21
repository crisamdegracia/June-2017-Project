var express = require('express'),
    router  = express.Router(),
    User    = require('../models/authModel'),
    passport    = require('passport')

router.get('/' , function(req, res ){
  res.redirect('/index')
})

//register
router.get('/register' , function(req, res){
    res.render('auth/register')
})
//Post Register.
router.post('/register' , function(req, res){
        req.body.username
        req.body.password
    User.register(new User({username: req.body.username}), req.body.password , function(err, newUser){
        if(err){
            return res.render('auth/register')
        } 
        passport.authenticate('local')(req, res, function(){
            res.redirect('/')
        })
    })
})

router.get('/login' , function(req, res){
    res.render('auth/login')
})

router.post('/login' , passport.authenticate('local' , {
    successRedirect: '/index',
    failureRedirect: '/register'
}), function(req, res){

})

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/index')
})


module.exports = router;