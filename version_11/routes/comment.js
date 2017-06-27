var express     = require('express'),
    router      = express.Router({mergeParams:true}),
    Comment     = require('../models/comment'),
    Camp        = require('../models/camp'),
    middleware  = require('../middleware')


//Show comment form
router.get('/' , middleware.isLoggedIn , function(req, res){
    Camp.findById(req.params.id , function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            res.render('comment/comment' , {data: foundCamp})
        }
    })
})



 
//CREATE Comment
router.post('/' , middleware.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            req.flash('error' , 'Something went wrong.')
            res.redirect('back')
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                newComment.author.id = req.user._id;
                newComment.author.name = req.user.username;
                newComment.save()
                foundCamp.comment.push(newComment)
                foundCamp.save()
                req.flash('success', 'Successfully added comment!')
                res.redirect('/index/' + req.params.id)

            })

        }
    })
})

//Edit : Show edit form with value
router.get('/:comment_id/edit' , middleware.commentOwnership, function(req, res){

    Comment.findById(req.params.comment_id , function(err , foundComment){
        if(err){
            req.flash('You need to log in to do that.')
            res.redirect('back')
        } else {
            
            res.render('comment/edit' , {comment:foundComment , camp_id: req.params.id})
        }
    })

})

//Updated
router.put('/:comment_id/edit' , middleware.commentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , function(err , updatedComment){
        if(err){
            res.redirect('back')
        } else {
            req.flash('success' , 'You have successfullly updated your comment!')
            res.redirect('/index/' + req.params.id)
        }


    })
})

//DESRTROY
router.delete('/:comment_id/' ,  middleware.commentOwnership, function(req, res){
    Camp.findById(req.params.id , function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            Comment.findByIdAndRemove(req.params.comment_id , function(err){
                if(err){
                    res.redirect('back')
                } else {
                    req.flash('success' , 'Comment removed! successfully!')
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




module.exports = router;