var mongoose    = require('mongoose'),
    
    CampSchema  = new mongoose.Schema({
        
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now},
        comment: [
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
        }
    })


module.exports = mongoose.model('Camp' , CampSchema);