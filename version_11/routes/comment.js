var express     = require('express'),
    router      = express.Router({mergeParams:true}),
    Comment     = require('../models/comment'),
    Camp        = require('../models/camp')


//Show comment form
router.get('/' , isLoggedIn , function(req, res){
    Camp.findById(req.params.id , function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            res.render('comment/comment' , {data: foundCamp})
        }
    })
})




//CREATE Comment
router.post('/' , isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                newComment.author.id = req.user._id;
                newComment.author.name = req.user.username;
                newComment.save()
                foundCamp.comment.push(newComment)
                foundCamp.save()

                res.redirect('/index/' + req.params.id)

            })

        }
    })
})

//Edit : Show edit form with value
router.get('/:comment_id/edit' , commentOwnership, function(req, res){

    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            Comment.findById(req.params.comment_id , function(err , foundComment){
                if(err){
                    res.redirect('back')
                } else {
                    res.render('comment/edit' , {comment:foundComment , camp_id: req.params.id})
                }
            })
        }
    })

})

//Updated
router.put('/:comment_id/edit' , commentOwnership, function(req, res){
    Camp.findById(req.params.id, function(err, foundComment){
        if(err){
            res.redirect('back')
        } else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , function(err , updatedComment){
                if(err){
                    res.redirect('back')
                } else {
                    res.redirect('/index/' + req.params.id)
                }
            })
        }
    })
})

//DESRTROY
router.delete('/:comment_id/' ,  commentOwnership, function(req, res){
    Camp.findById(req.params.id , function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            Comment.findByIdAndRemove(req.params.comment_id , function(err){
                if(err){
                    res.redirect('back')
                } else {
                    res.redirect('back')
                }
            })
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}


function commentOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect('back')
            } else {
                if(foundComment.author.id.equals(req.user._id)){
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