var express     = require('express'),
    router      = express.Router({mergeParams:true}),
    Comment     = require('../models/commentModel'),
    Camp        = require('../models/campModel'),
    middleware  = require('../middleware')


router.post('/', function(req, res){
    Camp.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error',"Couldn't find user.")
            res.redirect('back')
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                newComment.author.id   = req.user._id;
                newComment.author.name = req.user.username;
                newComment.save();
                foundUser.comment.push(newComment)
                foundUser.save();
                res.redirect('back')   
            })
        }
    })
})


router.get('/:comment_id/edit' , middleware.commentOwnership  , function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash('error' , "Couldn't found comment")
            res.redirect('back')
        } else {
            res.render('comment/edit' , {camp_id : req.params.id , comment: foundComment })
        }

    })
})

router.put('/:comment_id', middleware.commentOwnership , function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment, function(err , updatedComment){
        if(err){
            req.flash('error' , 'Something went wrong, Please try again!');
            res.redirect('back')
        } else {
            res.redirect('/index/' + req.params.id)
        }
    })
})


// DELETING COMMENT
router.delete('/:comment_id' , middleware.commentOwnership ,  function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id , function(err){
        if(err){
            req.flash('error' , "Couldn't delete comment right now please try again")
            res.redirect('back')
        } else {
            res.redirect('back')
        }
    })
    
})



module.exports  = router;