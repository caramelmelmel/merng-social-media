import React, {useContext, useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import {useForm} from '../util/hooks'

function Login(props) {
    const context = useContext(AuthContext)
    //keep components of errors 
    const [errors, setErrors] = useState({})

    //initiate the initial state
    const initialState = {
        username: '',
        password: ''
    }

    const {onChange, onSubmit, values} = useForm(loginUserCallback, initialState)

    const[loginUser, {loading}] = useMutation(LOGIN_USER,{
        update(proxy, {data: {login: userData}}){
        context.login(userData)
        props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        //give variables of mutation
        variables: values
    })

    function loginUserCallback(){
        loginUser();
    }

    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                label="Username"
                placeholder="Username.."
                name="username"
                type="text"
                value={values.username}
                error={errors.username ? true : false}
                onChange={onChange}
                />
                <Form.Input
                label="Password"
                placeholder="Password.."
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? true : false}
                onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className= "list">
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    )
}

//graphql mutation server side validation
const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username
                password: $password
        ){
            id
            email
            username
            createdAt
            token
        }
    }`

export default Login