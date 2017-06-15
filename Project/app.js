//Passport Requiring
var passportLocalMongoose   = require('passport-local-mongoose'),
    LocalStrategy           = require('passport-local'),
    passport                = require('passport'),
    
    
//Mongoose , express and anything else
    bodyParser              = require('body-parser'),
    mongoose                = require('mongoose'),
    expressSanitizer        = require('express-sanitizer'),
    methodOverride          = require('method-override'),
    express                 = require('express'),
    app                     = express(),

//Models
    User                    = require('./models/userModel'),
    
//Routes
    campRoutes              = require('./routes/campRoutes'),
    commentRoutes           = require('./routes/commentRoutes'),
    userRoutes              = require('./routes/userRoutes')

mongoose.connect('mongodb://127.0.0.1/git_project');


mongoose.Promise = global.Promise;

app.use(require('express-session')({
    secret: 'Wag kang Magulog Jan',
    resave: false,
    saveUninitialized: false
}))

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//Passport Config

app.use(passport.initialize());
app.use(passport.session());

//authenticating the new user
//User.authencticate is from passportLocalMongoose's users info/input
 
passport.use(new LocalStrategy(User.authenticate()));

//after authenticating from local-passport-mongoose 
//users info are encoding it back to the the session
// user that has registered or logged in.
passport.serializeUser(User.serializeUser());
//unencoding the user's info to the session
passport.deserializeUser(User.deserializeUser());

//setting User's Info
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


app.use('/' , userRoutes);
app.use('/index', campRoutes);
app.use('/index/:id/comment', commentRoutes);


app.listen(27107, function(){
    console.log('Server Started....')
})