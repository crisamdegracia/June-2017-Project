var express = require('express'),
    router  = express.Router({mergeParams:true}),
    Camp    = require('../models/campModel')




//Index
router.get('/' , function(req, res) {
    
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
router.get('/new', function(req, res){
    res.render('camp/new');
})

//Create
router.post('/new' , function(req, res) {
    
    Camp.create( req.body.camp , function(err, newCamp){
      if(err){
          console.log(err)
      }  else {
          res.redirect('/')
      }
    })
    
})

//SHOW
router.get('/:id/show' ,  function(req, res){
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
router.get('/:id/edit' , function(req, res) {
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
router.put('/:id', function(req, res){
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
router.delete('/:id', function(req, res){
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