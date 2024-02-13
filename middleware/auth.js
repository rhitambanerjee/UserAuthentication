const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();


//function to authenticate user
const auth = async (req, res, next) => {

	// Extracting the JWT token from the request headers
	const token = req.header("x-access-token");
	if (!token)
		return res
			.status(403)
			.json({ error: true, message: "Access Denied: No token provided" });

	try {

		// Verifying the JWT token using the private key stored in environment variables
		const tokenDetails = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_PRIVATE_KEY
		);

		// Attaching token details to the request object and invoking the next middleware
		req.user = tokenDetails;
		next();
	} catch (err) {
		console.log(err);
		res
			.status(403)
			.json({ error: true, message: "Access Denied: Invalid token" });
	}
};

module.exports=auth;
