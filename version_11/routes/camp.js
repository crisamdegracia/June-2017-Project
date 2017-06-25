var express     = require('express'),
    router      = express.Router(),
    Camp        = require('../models/camp'),
    Comment     = require('../models/comment')

//index
router.get('/' , function(req, res){
    Camp.find({} , function(err, foundCamp){
        if(err){
            console.log(err)
        } else {
            res.render('camp/index' , {data:foundCamp})
        }
    })
})


//new 
router.get('/new' , isLoggedIn ,  function(req, res){
    res.render('camp/new')
})

//create
router.post('/:id', isLoggedIn ,  function(req, res){
    var title = req.body.camp.title;
    var image = req.body.camp.image;
    var body = req.body.camp.body;
    var author = {
        id: req.user._id,
        name: req.user.username
    }

    body = req.sanitize(body);
    Camp.create({title:title, image: image , body:body , author:author}, function(err, newCamp){
        if(err){
            res.redirect('back')   
        } else {
            res.redirect('/')
        }
    })

})

//Show 
router.get('/:id' ,  function(req, res){
    Camp.findById(req.params.id).populate('comment').exec(function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            res.render('camp/show' , { data:foundCamp})
        }
    })

})

//Edit Form
router.get('/:id/edit', campOwnership , function(req, res){
    Camp.findById(req.params.id , function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            res.render('camp/edit' , {data:foundCamp})
        }
    })
})

//UPDATE
router.put('/:id/edit' , campOwnership ,  function(req, res){

    Camp.findByIdAndUpdate(req.params.id, req.body.camp , function(err, updatedCamp){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/index/' + req.params.id)
        }
    })

})

//DESTROY
router.delete('/:id' , campOwnership ,  function(req, res) {
    Camp.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/')
        }
    })
})


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('back')
}

function campOwnership(req, res, next){

    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCamp){
            if(err){
                res.redirect('back')
            } else {
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back')
                }
            }
        })

    } else {
        res.redirect('back')
    }
}


module.exports = router;