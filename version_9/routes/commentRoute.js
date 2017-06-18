var express = require('express'),
    router  = express.Router({mergeParams:true}),
    Comment = require('../models/commentModel'),
    Camp    = require('../models/campModel'),
    User    = require('../models/authModel');


router.get('/' , isLoggedIn , function(req, res ){
    Camp.findById(req.params.id , function(err, foundUser){
        if(err){
            console.log(err)
        }
        else {
            console.log(req.params.id + '<<<<< ---- ID')
            console.log(foundUser)
            res.render('comment/comment', { data:foundUser})
        }
    })
})


router.post('/',  function(req, res){
    Camp.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err)
        } else {
                
            Comment.create( req.body.comment, function(err, newComment){
                if(err){
                    console.log(err)
                } else {
                
                    newComment.author.name = req.user.username;
                    newComment.author.id = req.user._id;
                    newComment.save();
                    foundUser.comment.push(newComment);
                    foundUser.save()
                    console.log(foundUser.comment);
                    res.redirect('/index/' + req.params.id)
                }

            })
        }
    })
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login')
}

module.exports = router;