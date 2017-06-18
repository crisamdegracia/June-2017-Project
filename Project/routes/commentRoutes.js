var express = require('express'),
    //merge params is for detecting the id from the user
    router  = express.Router({mergeParams:true}),
    Camp    = require('../models/campModel'),
    Comment = require('../models/commentModel');


//New ROutes
router.get('/',  isLoggedIn , function(req, res){
    Camp.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err)
        }
        else {
            res.render('comment/comment' , {data:foundUser})
        }
    })
})

router.post('/' , function(req, res) {
    Camp.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err)
        }
        else {
            Comment.create(req.body.comment , function(err , newComment){
                if(err){
                    console.log(err)
                }
                else {

                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundUser.comment.push(newComment);
                    foundUser.save();
                    res.redirect('/index/' + req.params.id + '/show')
                }
            })
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