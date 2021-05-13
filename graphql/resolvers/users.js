const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
//import user mongoose model
const {SECRET_KEY} = require('../../config')
const User = require('../../models/User')

// function to generate jwt
function generateToken(user){
    return jwt.sign({
        id:user.id,
        email: user.email,
        username:user.username
    },
    SECRET_KEY,
    {expiresIn:'1hr'}
    )
}
module.exports = {
    Mutation:{
        //sign in 
        async login(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password)

            //check empty fields
            if(!valid){
                throw new UserInputError('Errors' , {errors})
            }

            //check user in db 
            const user = await User.findOne({username})
            console.log('does user exist?')

            if(!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found',{errors})
            }

            //check password match 
            const match = await bcrypt.compare(password,user.password)
            if(!match){
                errors.general = 'Wrong Credentials'
                throw new UserInputError('Wrong credentials',{errors})
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        //sign up
        async register(_,
            {
                registerInput:{username, email, password, confirmPassword}
            }
            ){

            // validate user data 
            const {valid,errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors',{errors})
            }

            // make sure user doesn't already exist
            var user = await User.findOne({ username});
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
        });
        }
            user = await User.findOne({email})

            if(user){
                throw new UserInputError('Email is taken',{
                    errors: {
                        username: 'This email is taken'
                    }
                })
            }
            //hash password and create auth token
            password = await bcrypt.hash(password,12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save()
            const userInfo = {
                id:res.id,
                email: res.email,
                username: res.username
            }
            const token = generateToken(userInfo);

            return{
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}
