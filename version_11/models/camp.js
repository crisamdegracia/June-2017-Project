var  mongoose   = require('mongoose');


var CampSchema  = new mongoose.Schema({

    title: String,
    image: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    created: {type:Date , default: Date.now}
})

module.exports = mongoose.model('Camp' , CampSchema )