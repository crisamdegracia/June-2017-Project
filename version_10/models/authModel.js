var passportLocalMongoose   = require('passport-local-mongoose'),
    mongoose                = require('mongoose'),
    
    
    UserSchema              = new mongoose.Schema({
        username: String,
        password: String
    })


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' , UserSchema)
