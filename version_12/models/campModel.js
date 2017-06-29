var mongoose  = require('mongoose');



var CampSchema  = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    price: String,
    localtion: String,
    lng: Number,
    lat: Number,
    created: {type:Date, default:Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports  = mongoose.model('Camp' , CampSchema);