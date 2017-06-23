var express = require('express'),
    router  = express.Router({mergeParams:true}),
    Comment = require('../models/commentModel'),
    Camp    = require('../models/campModel')

//Show Form
router.get('/' , isLoggedIn, function(req, res){
    Camp.findById( req.params.id , function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            res.render('comment/comment' , { data:foundUser})
        }
    })
})
//Create comment
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

//EDIT 
router.get('/:comment_id/edit' , campOwnership ,  function(req, res){
    Comment.findById(req.params.comment_id , function(err, updatedComment){
        if(err){
            res.redirect('back')
        } else {
            res.render('comment/edit' , {camp_id: req.params.id , comment: updatedComment})
        }
    })
})

//UPDATE
router.put('/:comment_id' ,  campOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , function(err, updatedComment){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/index/' + req.params.id)
        }
    })
})

//DESTROY
router.delete ('/:comment_id/' , campOwnership , function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id , function(err){
        if(err){
            res.redirect('back')
        } else {
            
            res.redirect('back')
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 

    res.redirect('/register')
}


function campOwnership(req, res, next) {

    //if user logged in
    if(req.isAuthenticated()){

        Comment.findById(req.params.comment_id , function(err, foundComment){
            if(err){
                res.redirect('back')
            } else {
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
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