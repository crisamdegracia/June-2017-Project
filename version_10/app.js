
//PASSPORT REQUIRE
var passportLocalMongoose   = require('passport-local-mongoose'),
    LocalStrategy           = require('passport-local'),
    passport                = require('passport'),
    
//Express and Others
    
    bodyParser              = require('body-parser'),
    methodOverride          = require('method-override'),
    expressSanitizer        = require('express-sanitizer'),
    express                 = require('express'),
    app                     = express(),
    mongoose                = require('mongoose'),
    
//Routes
    authRoute               = require('./routes/authRoute'),
    campRoute               = require('./routes/campRoute'),
    commentRoute            = require('./routes/commentRoute'),
    
//Models
    User                    = require('./models/authModel'),              
    Camp                    = require('./models/campModel'),                 
    Comment                 = require('./models/commentModel');



app.use(require('express-session')({
    secret: 'kingemon asd dsa',
    resave: false,
    saveUninitialized: false
    
}))

mongoose.connect('mongodb://127.0.0.1/camp_v10');
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


//Passport Configuration
app.use(passport.initialize());
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use('/', authRoute);
app.use('/index', campRoute);
app.use('/index/:id/comment' , commentRoute);

app.listen(27017, function(){
    console.log('Connected.....')
})