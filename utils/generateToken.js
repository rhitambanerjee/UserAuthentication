const jwt=require('jsonwebtoken');
const UserToken=require('../models/UserToken');
const dotenv=require('dotenv');

const generateToken=async(user)=>{
    dotenv.config();
    try{
        const payload={_id:user._id};
        const accessToken=jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );
        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();
        await new UserToken({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    }
    catch{
        return Promise.reject(err);
    }
}

module.exports=generateToken;