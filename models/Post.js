const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    //array of comments
    comments:[
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes:[
        {
            username: String,
            createdAt: String
        }
    ],
    //ORM realtions between models
    user:{
        type: Schema.Types.ObjectId,
        //pass the collection
        ref:'users'
    }
})

module.exports = model('Post',postSchema)