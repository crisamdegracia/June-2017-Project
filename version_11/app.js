//REQUIRING PASSPORT
var passportLocalMongoose   = require('passport-local-mongoose'),
    LocalStrategy           = require('passport-local'),
    passport                = require('passport'),

//REQUIRING EXPRESS AND OTHERS
    bodyParser              = require('body-parser'),
    methodOverride          = require('method-override'),
    expressSanitizer        = require('express-sanitizer'),
    express                 = require('express'),
    app                     = express(),
    mongoose                = require('mongoose'),
    flash                   = require('connect-flash'),

//RUQUIRING MODELS
    User                    = require('./models/user'),
    Camp                    = require('./models/camp'),
    Comment                 = require('./models/comment'),

//REQUIRING ROUTES
    
    userRoute               = require('./routes/user'),
    campRoute               = require('./routes/camp'),
    commentRoute            = require('./routes/comment')


app.use(require('express-session')({
    secret: 'Secrete daw klamo',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:600000}
}))

mongoose.connect('mongodb://localhost/camp_11');
mongoose.Promise = global.Promise;

app.use(flash());
app.set('view engine' , 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(express.static(__dirname + '/public'));


app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash('error');
    res.locals.success     = req.flash('success');
    res.locals.message     = req.flash('message');
    next();
})



app.use('/', userRoute);
app.use('/index', campRoute);
app.use('/index/:id/comment' , commentRoute )



app.listen(27107 , function(){
    console.log('Version 10 server Connected....')
})