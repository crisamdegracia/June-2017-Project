var mongoose = require('mongoose'),
    
    
    CommentSchema   = new mongoose.Schema({
        text: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        created: {type: Date, default: Date.now}
    })


module.exports = mongoose.model('Comment' , CommentSchema )