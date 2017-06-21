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
    campRoute               = require('./routes/campRoute'),
    authRoute               = require('./routes/authRoute'),
//    commentRoute            = require('./routes/commentRoute'),
    
//Models
    Camp                    = require('./models/campModel'),                    
    User                    = require('./models/authModel'),              
    Comment                 = require('./models/commentModel');


mongoose.connect('mongodb://localhost/camp_v10');
mongoose.Promise = global.Promise;

app.use(require('express-session')({
   
    secret: 'kingemon',
    resave: false,
    saveUninitialized: false
    
}))

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'))
app.use(methodOverride('_method'));
app.use(expressSanitizer());


//Passport Configuration
app.use(passport.initialize());
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser)
passport.deserializeUser(User.deserializeUser)

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use('/', authRoute);
app.use('/index', campRoute);



app.listen(27017, function(){
    console.log('Connected.....')
})