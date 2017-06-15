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
router.post('/new' , isLoggedIn , function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    },
        title = req.body.camp.title,
        image = req.body.camp.image,
        body  = req.body.camp.body;
   
    
    Camp.create({title: title, image:image, body:body, author: author } , function(err, newCamp){
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
    res.redirect('/login')
}


module.exports = router;



//
//
//Dolor occaecat iudicem, non veniam ita summis, illum in cupidatat ad lorem 
//laboris imitarentur nam nam irure noster se singulis, officia velit multos 
//nescius quis, ad illum enim ad incididunt, aliquip duis proident deserunt. 
//Mentitum hic varias officia, nam fore nulla legam excepteur do officia ne fugiat 
//officia, admodum tractavissent ea probant. Magna cupidatat qui multos tamen, 
//    expetendis culpa fabulas offendit. Dolor philosophari commodo duis fabulas, 
//        minim incididunt et quibusdam. Sed culpa laboris sempiternum te quamquam quis 
//        mentitum, quae si admodum se sint, id incididunt id doctrina an a nisi 
//        voluptatibus, an o veniam enim dolore, hic duis sempiternum o consequat 
//        praesentibus iis occaecat. Voluptate labore ingeniis occaecat o offendit in 
//            legam se multos te ubi fore vidisse eu in malis efflorescere, senserit anim 
//            tamen officia dolore, quae exquisitaque officia amet singulis eu cillum occaecat 
//            consectetur ab aut litteris ita aliquip. O qui distinguantur ex excepteur sint 
//            lorem ita culpa.