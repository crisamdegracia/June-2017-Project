var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/authModel'),
    passport    = require('passport');


//Redirect to Index
router.get('/' , function(req, res){
    res.redirect('/index')
})


//REGISTER FORM
router.get('/register' , function(req, res){
    res.render('./auth/register')
})

//REGISTER POST
router.post('/register', function(req, res){
    req.body.username
    req.body.password

    User.register(new User({username: req.body.username}) , req.body.password, function(err, newUser){
        if(err){
            return res.redirect('/register')    
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/index')
        })
    })
})

//LOGIN FORM
router.get('/login' , function(req, res){
    res.render('./auth/login')
});

//LOGIN POST
router.post('/login', passport.authenticate('local' , {
    successRedirect: '/index',
    failureRedirect: '/register'
}), function(req, res){
    
})

router.get('/logout' , function(req, res){

    req. logout();
    res.redirect('/');

})


module.exports = router;