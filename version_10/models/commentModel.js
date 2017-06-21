var mongoose = require('mongoose'),
    
    
    CommentSchema   = new mongoose.Schema({
        text: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: String,
        },
        created: {type: Date, default: Date.now}
    })


module.exports = mongoose.model('Comment' , CommentSchema )