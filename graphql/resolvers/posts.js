const {AuthenticationError, UserInputError, PubSub} = require('apollo-server');
const { UniqueFragmentNamesRule } = require('graphql');

const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getPosts() {
            console.log('getPosts')
          try {
            const posts = await Post.find().sort({ createdAt: -1 });
            return posts;
          } catch (err) {
            throw new Error(err);
          }
        },
        async getPost(_,{postId}){
            console.log('getPost')
            try{
                const post = await Post.findById(postId)
                if(post){
                    return post
                }else{
                    throw new Error('Post not found')
                }
            }catch(err){
                throw new Error(err)
            }
        }
      },

    Mutation: {
        async createPost(_, {body}, context){
            console.log('create post')
            //auth settled
            const user = checkAuth(context)

            //if post is empty
            if(body.trim() === ''){
                throw new Error('Post body must not be empty')
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
              });

            const post = await newPost.save();
            
            context.pubsub.publish('NEW_POST',{
                newPost: post
            })
            return post
        },

        //delete post
        async deletePost(_,{postId}, context){
            const user = checkAuth(context)

            try{
                const post = await Post.findById(postId)
                if(user.username === post.username){
                    await post.delete();
                    return 'post deleted successfully'
                }else{
                    throw new AuthenticationError('Action not allowed')
                }
            }catch(err){
                throw new Error(err)
            }
        },

        async likePost(_,{postId},context){
            const {username} = checkAuth(context)

            const post = await Post.findById(postId)

            if(post){
                //make sure exists
                if(post.likes.find(like => like.username === username))
                {

                    //post is already liked, unlike it 
                    post.likes = post.likes.filter(like => like.username !== username);
                    await post.save()

                }else {
                    //not liked, like post
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })

                    }
                await post.save()
                return post
            }

            //if post is non existent 
            else {
                throw new UserInputError('Post not found')
            }
        }
    },

    Subscription:{
        newPost: {
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator('NEW_POST')
        }
    }
    
}