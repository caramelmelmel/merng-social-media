const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
//import user mongoose model
const {SECRET_KEY} = require('../../config')
const User = require('../../models/User')

module.exports = {
    Mutation:{

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
            const token = jwt.sign(userInfo,SECRET_KEY,{expiresIn: '1h'});

            return{
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}
