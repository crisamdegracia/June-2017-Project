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
//    campRoute               = require('./routes/campRoute'),
//    authRoute               = require('./routes/authRoute'),
//    commentRoute            = require('./routes/commentRoute'),
    
//Models
//    Camp                    = require('./models/campModel'),                    
    User                    = require('./models/authModel')                  
//    Comment                 = require('./models/commentModel'),                    

app.use(require('express-session')({
   
    secret: 'kingemon',
    resave: false,
    saveUninitialized: false
    
}))

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());


//Passport Configuration
app.use(passport.initialize());
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser)
passport.deserializeUser(User.deserializeUser)




app.listen(27107, function(){
    console.log('Connected.....')
})