var express     = require('express'),
    router      = express.Router(),
    Camp        = require('../models/campModel'),
    Comment     = require('../models/commentModel'),
    User        = require('../models/authModel')


//INDEX
router.get('/' , function(req, res){

    Camp.find({} , function(err, user){
        if(err){
            console.log(err);
        } else {
            res.render('./camp/index', {data: user})
        }
    })

})

//NEW
router.get('/new' , isLoggedIn , function(req, res){
    res.render('./camp/new')
})


//CREATE
router.post('/new' , isLoggedIn ,  function(req, res) {

    var title = req.body.camp.title,
        image = req.body.camp.image,
        body  = req.body.camp.body,
        author = 
        {
            id: req.user._id,
            name: req.user.username
        },
        body

    Camp.create({
        
        title:title,
        image: image,
        body:body ,
        author:author
    
    },
        function(err, newCamp){
            if(err) {
                console.log(err)
             } 
        else {
            res.redirect('/')
        }
    })
})
//Show
router.get('/:id', function(req, res){
    Camp.findById(req.params.id).populate('comment').exec(function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.render('camp/show' , {data: foundUser})

        }
    })
})

//EDIT
router.get('/:id/edit' , campOwnership ,   function(req, res){
    Camp.findById(req.params.id , function(err, foundUser){
        res.render('camp/edit' , {data: foundUser})

    })
})

//UPDATE
router.put('/:id/edit' , campOwnership , function(req,  res) {
    Camp.findByIdAndUpdate(req.params.id , req.body.camp , function(err, updateUser){
        if(err){
            console.log(err)
        } else {
            res.redirect('/index/' + req.params.id)
        }
    })
})
//DESTROY
router.delete('/:id/', campOwnership, function(req , res){

    Camp.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect('/index/' + req.params.id )
        } else {
            res.redirect('/index')            
        }
    })
})
function isLoggedIn(req, res , next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/login')
}

function campOwnership(req, res, next) {

    //if user logged in
    if(req.isAuthenticated()){

        Camp.findById(req.params.id , function(err, foundUser){
            if(err){
                res.redirect('back')
            } else {
                //does user own the campground?
                if(foundUser.author.id.equals(req.user._id)){
                    next();
                } else {
                    // otherwise redirect somwhere
                    res.redirect('back')
                }
            }
        })
        //if not redirect somewher
    } else {
        res.redirect('back')
    }
}

module.exports = router;