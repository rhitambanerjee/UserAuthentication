const { Router } =require("express");
const UserToken =require("../models/UserToken.js");
const jwt =require("jsonwebtoken");
const dotnenv=require("dotenv");
const verifyRefreshToken =require("../utils/verifyRefreshToken.js");
const { refreshTokenBodyValidation } =require("../utils/validationSchema.js");
const router = Router();
dotnenv.config();

//Route for getting a new access token using a refresh token
router.post("/", async (req, res) => {
	// Validating the request body for refresh token
	const { error } = refreshTokenBodyValidation(req.body);
	if (error)
		return res
			.status(400)
			.json({ error: true, message: error.details[0].message });


	// Verifying the refresh token
	verifyRefreshToken(req.body.refreshToken)
		.then(({ tokenDetails }) => {

			// Creating payload for new access token
			const payload = { _id: tokenDetails._id};

			// Signing a new access token with the payload
			const accessToken = jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_PRIVATE_KEY,
				{ expiresIn: "14m" }
			);
			res.status(200).json({
				error: false,
				accessToken,
				message: "Access token created successfully",
			});
		})
		.catch((err) => res.status(400).json(err));
});

// Route for logging out (deleting refresh token)
router.delete("/", async (req, res) => {
	try {
		const { error } = refreshTokenBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		// Finding the user token associated with the refresh token
		const userToken = await UserToken.findOne({ token: req.body.refreshToken });
		if (!userToken)
			return res
				.status(200)
				.json({ error: false, message: "Logged Out Sucessfully" });

		// Removing the user token from the database
		await userToken.remove();
		res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

export default router;
