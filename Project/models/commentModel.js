var mongoose = require('mongoose')


var CommentSchema = new mongoose.Schema({
    
    author: String,
    text: String,
    created:{type: Date , default: Date.now }
})

module.exports = mongoose.model('Comment', CommentSchema)