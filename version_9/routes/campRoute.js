var express = require('express'),
    router  = express.Router(),
    Camp    = require('../models/campModel'),
    Comment = require('../models/commentModel')
//Index

router.get('/' , function(req, res){
    Camp.find({} , function(err, user){
        if(err){
            console.log(err);
        } else {
            res.render('./camp/index' , { data : user })
        }
    })
})

//New
router.get('/new' ,  isLoggedIn, function(req, res){
    res.render('./camp/new')
})

//Create
router.post('/new' , isLoggedIn ,  function(req, res){
    var title = req.body.camp.title,
        image = req.body.camp.image,
        body = req.body.camp.body,
        author = {
            id: req.user._id,
            name: req.user.username
        }
    
    Camp.create({title: title, image: image, body: body , author: author}, function(err, newCamp){
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

//Show
router.get('/:id', function(req, res){
  Camp.findById(req.params.id).populate('comment').exec(function(err , foundCamp){
      if(err){
          console.log(err)
      } else {
          res.render('./camp/show' , {data: foundCamp})
      }
  })  
})



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect('/login')
}


module.exports = router;