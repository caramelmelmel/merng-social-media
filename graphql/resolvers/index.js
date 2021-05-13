const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

//... means spread
module.exports={
    Post: {
        //parent comes from the get posts
        likeCount: (parent)=>{
            return parent.likes.length
        },
        commentCount: (parent) => parent.comments.length 
    },
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}