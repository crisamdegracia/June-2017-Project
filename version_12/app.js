//PASSPORT REQUIRE
var passportLocalMongoose   = require('passport-local-mongoose'),
    LocalStrategy           = require('passport-local'),
    passport                = require('passport'),


    //EXPRESS AND OTHERS 
    methodOverride          = require('method-override'),
    expressSanitizer        = require('express-sanitizer'),
    bodyParser              = require('body-parser'),
    express                 = require('express'),
    mongoose                = require('mongoose'),
    app                     = express(),
    flash                   = require('connect-flash'),
    
    
    //ROUTES
    userRoute               = require('./routes/index'),
    campRoute               = require('./routes/campRoute'),
    commentRoute            = require('./routes/commentRoute'),
    
    //MODELS
    User                    = require('./models/index'),
    Camp                    = require('./models/campModel'),
    Comment                 = require('./models/commentModel')



//Express Config
app.use(require('express-session')({
    secret: 'once uppon a time',
    resave: false,
    saveUninitialized: false
}))


//CONNECTING TO DATABASE
//mongoose.connection.openUri('mongodb://localhost/camp_v12', { useMongoClient: true })
mongoose.connect('mongodb://localhost/camp_v12');
mongoose.Promise = global.Promise;

app.use(flash());
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

app.use(express.static(__dirname + '/public'))

app.locals.moment = require('moment');

//PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash('error');
    res.locals.success      = req.flash('success');
    next();
})




app.use('/', userRoute);
app.use('/index', campRoute);
app.use('/index/:id/comment' , commentRoute);

app.listen(27017 , function(){
    console.log('Version 12 server started......')
})