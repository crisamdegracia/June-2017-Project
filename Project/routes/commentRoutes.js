var express = require('express'),
    router  = express.Router({mergeParams:true}),
    Camp    = require('../models/campModel'),
    Comment = require('../models/commentModel');



router.get('/index/:id/comment', function(req, res){
    Camp.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err)
        }
        else {
            res.render('comment/comment' , {data:foundUser})
        }
    })
})

router.post('/index/:id/comment' , function(req, res) {
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
                    foundUser.save();
                    foundUser.comment.push(newComment);
                    res.redirect('/index/' + req.params.id + '/show')
                }
            })
        }
    })
})


module.exports = router;