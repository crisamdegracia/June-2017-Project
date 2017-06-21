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
router.get('/new' , function(req, res){
    res.render('./camp/new')
})


//CREATE
router.post('/new' , function(req, res) {

    var title = req.body.camp.title,
        image = req.body.camp.image,
        body  = req.body.camp.body,
        author = 
        {
            id: req.user._id,
            name: req.user.username
        }

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




module.exports = router;