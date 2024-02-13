const jwt=require('jsonwebtoken');
const UserToken=require('../models/UserToken');
const dotenv=require('dotenv');


// Function to generate access and refresh tokens
const generateToken=async(user)=>{
    dotenv.config();
    try{

        // Creating payload for access and refresh tokens with user's ID
        const payload={_id:user._id};

        // Generating an access token
        const accessToken=jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );

        // Generating a refresh token
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );

        // Checking if there's already a token associated with the user
        const userToken = await UserToken.findOne({ userId: user._id });

        // If there's already a token, remove it
        if (userToken) await userToken.remove();

        // Saving the new refresh token associated with the user
        await new UserToken({ userId: user._id, token: refreshToken }).save();

        //returning the token
        return Promise.resolve({ accessToken, refreshToken });
    }
    catch{
        return Promise.reject(err);
    }
}

module.exports=generateToken;
