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


module.exports = router;