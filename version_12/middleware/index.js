var middlewareObj = {},
    Camp    = require('../models/campModel'),
    Comment = require('../models/commentModel')


middlewareObj.isLoggedIn = function(req, res, next){
    
    if(req.isAuthenticated()){
    return next()
    }
    req.flash('error' , 'You do not have permission to do that, please login')
    res.redirect('/login')
    
}

middlewareObj.campOwnership = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        Camp.findById(req.params.id , function(err, foundUser){
            if(err){
                req.flash('error', 'Camp not found.')
                res.redirect('back')
            } else {
                if(foundUser.author.id.equals(req.user._id)){
                 next()
                } else {
                    req.flash('error' , 'You do not have permission to do that.');
                    res.redirect('/index/' + req.params.id);
                }
            }
        })
    }
    else {
        req.flash('error' , 'You are not logged in.')
        res.redirect('back')
    }
}


middlewareObj.commentOwnership = function(req, res, next){
    
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id , function(err, foundComment){
            if(err){
                req.flash('error', "You do not have permission to do that.")
                res.redirect('back')
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error' , 'You do not have permission to do that.');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error' , 'You do not have permission to do that.');
        res.redirect('back');
    }
}



module.exports = middlewareObj;