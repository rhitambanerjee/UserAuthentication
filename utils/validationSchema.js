const Joi = require('joi');
const joi=require('joi');
const passwordComplexity=require('joi-password-complexity');


// Function to validate the request body for sign up
const signUpBodyValidation=(body)=>{
    // Defining the schema for sign up request body validation using Joi
    const schema=Joi.object({
        username:Joi.string().required().label("username"),
        email:Joi.string().email.required().label("email"),
        password: passwordComplexity().required().label("password"),
    })
    // Validating the request body against the defined schema
    return schema.validate(body);
};

const logInBodyValidation = (body) => {
    // Defining the schema for login request body validation using Joi
    const schema = Joi.object({
        username: Joi.string().required().label("username."),
        password: Joi.string().required().label("password"),
    });
    // Validating the request body against the defined schema
    return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
    // Defining the schema for refresh token validation using Joi
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    // Validating the request body against the defined schema
    return schema.validate(body);
};


module.exports={signUpBodyValidation,logInBodyValidation,refreshTokenBodyValidation};
