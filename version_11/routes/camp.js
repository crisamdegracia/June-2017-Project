var express     = require('express'),
    router      = express.Router(),
    Camp        = require('../models/camp'),
    Comment     = require('../models/comment'),
    middleware  = require('../middleware'),
    geocoder    = require('geocoder')

//index


router.get('/' , function(req, res){
    
    Camp.find({} , function(err, foundCamp){
        if(err) {
            console.log(err)
        } else {
            
            res.render('camp/index' , {data:foundCamp})
        }
    })
})


//new 
router.get('/new' ,  middleware.isLoggedIn ,  function(req, res){
    res.render('camp/new')
})

//create
router.post('/:id',  middleware.isLoggedIn ,  function(req, res){
    var title = req.body.camp.title;
    var price = req.body.camp.price;
    var image = req.body.camp.image;
    var body = req.body.camp.body;
    var author = {
        id: req.user._id,
        name: req.user.username
    };
    
    geocoder.geocode(req.body.camp.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;

    body = req.sanitize(body);
        
    Camp.create({title:title, price: price, image: image , body:body , author:author , lng:lng, lat:lat, location:location}, function(err, newCamp){
        if(err){
            res.redirect('back')   
        } else {
            res.redirect('/index')
        }
    })

})
    
})

//Show 
router.get('/:id' ,  function(req, res){
    Camp.findById(req.params.id).populate('comment').exec(function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            res.render('camp/show' , { data:foundCamp})
        }
    })

})

//Edit Form
router.get('/:id/edit',  middleware.campOwnership , function(req, res){
    Camp.findById(req.params.id , function(err, foundCamp){
        if(err){
            res.redirect('back')
        } else {
            res.render('camp/edit' , {data:foundCamp})
        }
    })
})

//UPDATE
router.put('/:id/edit' ,  middleware.campOwnership ,  function(req, res){
    
geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.camp.name, image: req.body.camp.image, description: req.body.camp.body, cost: req.body.price, location: location, lat: lat, lng: lng};
    Camp.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/index/" + campground._id);
        }
    });
  });

})

//DESTROY
router.delete('/:id' ,  middleware.campOwnership ,  function(req, res) {
    Camp.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/')
        }
    })
})


module.exports = router;