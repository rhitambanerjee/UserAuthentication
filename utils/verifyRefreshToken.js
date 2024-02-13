const UserToken=require('../models/UserToken');
const jwt=require('jsonwebtoken');


// Function to verify the refresh token
const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    // Returning a promise to handle asynchronous verification process
    return new Promise((resolve, reject) => {

        // Finding the user token associated with the refresh token
        UserToken.findOne({ token: refreshToken }, (err, doc) => {
            if (!doc)
                return reject({ error: true, message: "Invalid refresh token" });

            // Verifying the refresh token using the private key      
            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err)
                    return reject({ error: true, message: "Invalid refresh token" });
                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        });
    });
};


module.exports=verifyRefreshToken
