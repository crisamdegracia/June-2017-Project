var express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    User = require('../models/userModel')

router.get('/' , function(req, res){
    res.redirect('/index')
})

router.get('/register' , function(req, res){
    res.render('user/register')
})


//after registering it will go to the serializeUse and deserialize user
// to encode and unencode to the session
router.post('/register' , function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}), req.body.password, function(err, newUser){
        if(err){
            return res.redirect('/register')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/index')
        })
    })
})

router.get('/login', function(req, res){
    res.render('user/login')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/register'
}), function(req, res){
    
})

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/')
})

function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}


module.exports = router;