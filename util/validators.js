module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) =>{
    const errors = {}

    //check username
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }

    //check password
    if(password.trim() === ''){
        errors.password = 'Password must not be empty'
    }else if(password != confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }else if(password.length < 8){
        errors.password = 'Password length must be more than 8'
    }else if(password){
       const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
       if(!password.match(regexPassword)){
           errors.password = 'Invalid password'
       }
    }
    
    //check email
    if(email.trim() === ''){
        errors.email = 'Email must not be empty'
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address'
        }
    }

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }

}

module.exports.validateLoginInput = (username,password) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'username must not be empty'
    }
    if(password.trim() === ''){
        errors.password = 'password must not be empty'
    }
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}