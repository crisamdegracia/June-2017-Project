var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    passport    = require('passport');





router.get('/' , function(req, res){

    res.render('camp/landing')

})


//Register Form
router.get('/register' , function(req, res){
    
    res.render('user/register')
})

//Register Post
router.post('/register' , function(req, res){
    
    User.register(new User({username : req.body.username}) , req.body.password , function(err, newUser){
        if(err){
            req.flash('error' , err.message)
            return res.redirect('back')
        } 
        passport.authenticate('local')(req, res, function(){
            req.flash('success' , 'Welcome To The Campgound ' + newUser.username)
            res.redirect('/index')
        })
    })
})

//login
router.get('/login' , function(req, res){
     
    res.render('user/login')
})

//login POST

router.post('/login' , passport.authenticate('local' ,  {
    successRedirect: '/index',
    failureRedirect: '/login'
}) , function(req, res){
   
})


router.get('/logout' , function(req, res){
    req.logout();
    req.flash('success', 'You have successfully logged out!')
    res.redirect('/index')
})


module.exports = router;