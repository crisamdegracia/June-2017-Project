var express  = require('express'),
    router   = express.Router(),
    User     = require('../models/index'),
    passport = require('passport')


router.get('/' , function(req, res){
    res.redirect('/index')
})


//REGISTER FORM
router.get('/register' , function(req, res){
    res.render('user/register')
})


//REGISTER LOGIC
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, newUser){
        if(err){
            req.flash('error' , err.message)
         return  res.redirect('back')
        } 
            
        passport.authenticate('local')(req, res, function(){
            req.flash('success' , 'You have successfully registered ' + req.user.username )
            res.redirect('/index')
        })
    })
})

//LOGIN FORM
router.get('/login', function(req, res){
   
    res.render('user/login')
})

//LOGIN LOGIC
router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/register'
}) , function(req, res){
    
})


router.get('/logout' , function(req, res){
    req.logout();
    res.redirect('/')
})



module.exports  = router;