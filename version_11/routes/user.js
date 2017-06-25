var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    passport    = require('passport');




router.get('/' , function(req, res){

    res.redirect('/index')

})

//Register Form
router.get('/register' , function(req, res){
    
    res.render('user/register')
})

//Register Post
router.post('/register' , function(req, res){
    
    User.register(new User({username : req.body.username}) , req.body.password , function(err, newUser){
        if(err){
            return res.redirect('back')
        } 
        passport.authenticate('local')(req, res, function(){
            res.redirect('/index')
        })
    })
})

//Register
router.get('/login' , function(req, res){
    res.render('user/login')
})

//REGISTER POST

router.post('/login' , passport.authenticate('local' , {
    successRedirect: '/index',
    failureRedirect: '/login'
}) , function(req, res){
    
})


router.get('/logout' , function(req, res){
    req.logout();
    res.redirect('/index')
})


module.exports = router;