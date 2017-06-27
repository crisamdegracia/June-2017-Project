var Camp = require('../models/camp'),
    Comment = require('../models/comment')
/// all middleware here
var middlewareObj = {}


//Check user if they are loggedin
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash('error' , 'You must log in first.')
    res.redirect('/login')
}
    


//Checks if users are the same for camp post
middlewareObj.campOwnership = function(req, res, next){

    //if user logged in
    if(req.isAuthenticated()){

        Camp.findById(req.params.id , function(err, foundUser){
            if(err){
                req.flash('error' , 'Campgorund not found')
                res.redirect('back')
            } else {
                //does user own the campground?
                if(foundUser.author.id.equals(req.user._id)){
                   
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that!')
                    // otherwise redirect somwhere
                    res.redirect('back')
                }
            }
        })
        //if not redirect somewher
    } else {
        req.flash('error', 'You need to log in to do that.')
        res.redirect('back')
    }
}
    


middlewareObj.commentOwnership = function(req, res, next){
   
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
    


module.exports = middlewareObj;