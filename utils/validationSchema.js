const Joi = require('joi');
const joi=require('joi');
const passwordComplexity=require('joi-password-complexity');

const signUpBodyValidation=(body)=>{
    const schema=Joi.object({
        username:Joi.string().required().label("username"),
        email:Joi.string().email.required().label("email"),
        password: passwordComplexity().required().label("password"),
    })
    return schema.validate(body);
};

const logInBodyValidation = (body) => {
    const schema = Joi.object({
        username: Joi.string().required().label("username."),
        password: Joi.string().required().label("password"),
    });
    return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(body);
};


module.exports={signUpBodyValidation,logInBodyValidation,refreshTokenBodyValidation};