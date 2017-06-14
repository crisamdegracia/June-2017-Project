var express = require('express'),
    router  = express.Router(),
    Camp    = require('../models/campModel')


router.get('/' , function(req, res){
    res.redirect('/index')
})

//Index
router.get('/index' , function(req, res) {
    
    Camp.find({} , function(err, user){
        if(err){
            console.log(err)
            res.render('camp/index')
        }
        else {
            res.render('camp/index' , {data: user})
        }
    })
})

//NEW
router.get('/index/new', function(req, res){
    res.render('camp/new');
})

//Create
router.post('/index/new' , function(req, res) {
    
    Camp.create( req.body.camp , function(err, newCamp){
      if(err){
          console.log(err)
      }  else {
          res.redirect('/')
      }
    })
    
})

//SHOW
router.get('/index/:id/show' , isLoggedIn ,  function(req, res){
    Camp.findById(req.params.id).populate('comment').exec(function(err, foundUser){
        if(err){
            console.log(err)
        }
        else {
    res.render('camp/show' , { data: foundUser})
            
        }
    })
})

//Edit 
router.get('/index/:id/edit' , function(req, res) {
    Camp.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err)
        }
        else {
            res.render('camp/edit', {data: foundUser})
        }
    })
})

//UPDATE
router.put('/index/:id', function(req, res){
    Camp.findByIdAndUpdate(req.params.id , req.body.camp , function(err, foundUser) {
        if(err){
            console.log(err)
        }
        else {
            res.redirect('/index/' + req.params.id + '/show')
        }
    })
})

//DESTROY
router.delete('/index/:id', function(req, res){
    Camp.findByIdAndRemove(req.params.id , function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }
        
    })
})


function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}


module.exports = router;