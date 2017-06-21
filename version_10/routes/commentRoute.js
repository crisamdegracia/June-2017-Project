var express = require('express'),
    router  = express.Router({mergeParams:true}),
    Comment = require('../models/commentModel'),
    Camp    = require('../models/campModel')

router.get('/' , isLoggedIn, function(req, res){
    Camp.findById( req.params.id , function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.render('comment/comment' , { data:foundUser})
        }
    })
})

router.post('/', function(req, res){

    Camp.findById(req.params.id , function(err,foundUser){
        if(err){
            console.log(err)
        } else {
            Comment.create(req.body.comment , function(err, newComment){
                if(err){
                    console.log(err);
                } else {
                    newComment.author.id     = req.user._id;
                    newComment.author.name   = req.user.username;
                    newComment.save();
                    foundUser.comment.push(newComment);
                    foundUser.save();
                    res.redirect('/index/' + req.params.id)
                }
            })
        }
    })
})


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    
    res.redirect('/register')
}


module.exports = router;