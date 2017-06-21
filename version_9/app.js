//Requiring Passport
var passportLocalMongoose   = require('passport-local-mongoose'),
    LocalStrategy           = require('passport-local'),
    passport                = require('passport'),
    
    
//Requiring Express and Else
    bodyParser              = require('body-parser'),
    methodOverride          = require('method-override'),
    expressSanitizer        = require('express-sanitizer'),
    express                 = require('express'),
    app                     = express(),
    mongoose                = require('mongoose'),
    
//Requiring Routes
    authRoute               = require('./routes/authRoute'),
    commentRoute            = require('./routes/commentRoute'),
    campRoute               = require('./routes/campRoute'),
    
//Requiring Models
    
    User                    = require('./models/authModel'),
    Comment                 = require('./models/commentModel'),
    Camp                    = require('./models/campModel');

app.use(require('express-session')({
    secret: 'Family is Love',
    resave: false,
    saveUninitialized: false
}))

mongoose.connect('mongodb://localhost/camp_v9');
mongoose.Promise = global.Promise;

app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//Passport Config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use('/', authRoute);
app.use('/index' , campRoute);
app.use('/index/:id/comment', commentRoute);

app.listen(27107 , function(){
    console.log('server started....')
})