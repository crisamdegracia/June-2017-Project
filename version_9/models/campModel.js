var mongoose    = require('mongoose');



var CampSchema  = new mongoose.Schema({

    title : String,
    image: String,
    body: String,
    comment : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
     author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    },
    created: {type:Date , default:Date.now}
})

module.exports = mongoose.model('Camp', CampSchema)