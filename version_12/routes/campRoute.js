var express     = require('express'),
    router      = express.Router(),
    Camp        = require('../models/campModel'),
    middleware  = require('../middleware'),
    geocoder    = require('geocoder');

//INDEX ROUTE
router.get('/' , function(req, res){
    Camp.find({} , function(err, foundUser){
        if(err){
            req.flash('error',"Something's not right.")
            res.redirect('back')
        } else {
            res.render('camp/index' , { data : foundUser })
            
        }
    })
})

//NEW ROUTE
router.get('/new' , middleware.isLoggedIn, function(req, res){
    res.render('camp/new')
})

//CREATE ROUTE
router.post('/new' , middleware.isLoggedIn ,  function(req, res){
    var title    = req.body.camp.title,
        image    = req.body.camp.image,
        price    = req.body.camp.price,
        body     = req.body.camp.body,
        author   = {
            id: req.user._id,
            name: req.user.username
        };
    
    
    geocoder.geocode(req.body.camp.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;

        
    Camp.create({
        title:title,
        image:image,
        price: price,
        lng: lng,
        lat: lat,
        location: location,
        body: body,
        author: author
    }, function(err , newUser){
        if(err){
            req.flash('error','Something went wrong while we are creating you camp, Please try again!')
            res.redirect('back')
        } else {
            req.flash('success' , 'Your Camp has successfully created!')
            res.redirect('/index')
        }
    })
    })
})
//SHOW ROUTE
router.get('/:id' , function(req, res){
    Camp.findById(req.params.id).populate('comment').exec(function(err, foundUser){
        if(err){
            req.flash('error' , 'Something went wrong.');
            res.redirect('/index')
        } else {
            res.render('camp/show' , {data: foundUser})
        }
    })  
    
})


//EDIT ROUTE
router.get('/:id/edit' , middleware.campOwnership ,  function(req, res){
    Camp.findById(req.params.id , function(err, foundUser){
        if(err){
            res.redirect('back')
        } else {
            res.render('camp/edit' , { data: foundUser })
        }
    })
})

//UPDATE ROUTE
router.put('/:id/edit' ,  middleware.campOwnership , function(req, res){
    Camp.findByIdAndUpdate(req.params.id , req.body.camp , function(err , updatedCamp){
        if(err){
            req.flash('error' , "Sorry, We couldn't update your camp now. please try again.");
            res.redirect('back')
        } else {
            req.flash('success' , 'Updated successfully!');
            res.redirect('/index/' + req.params.id )
        }
    })
})

//DESTROY ROUTE

router.delete('/:id' , middleware.campOwnership , function(req, res){
    Camp.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/index')
        }
    })
})






module.exports  = router;