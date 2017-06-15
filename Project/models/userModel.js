var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


var UserSchema  = new mongoose.Schema({
    username: String,
    password: String
})

//handles the username and password 
//it makes the password has salt and a hash...
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User' , UserSchema);