const {Router}=require('express');
const router=Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv')
const generateToken=require('../utils/generateToken');
const {signUpBodyValidation,logInBodyValidation}=require('../utils/validationSchema');
dotenv.config();


// Route for user sign up
router.get('/signUp',async(req,res)=>{
    try{

        // Validating the request body for sign up
        const {error}=signUpBodyValidation(req.body);
        if(error){
            res.status(400).json({error: true, message: error.details[0].message});
        }

        // Checking if a user with the provided email already exists
        const user=await User.findOne({email:req.body.email});
        if(user){
            res.status(400).json({error:true,message:"User with given email exists"});
        }

        // Generating a salt for password hashing
        const salt=await bcrypt.genSalt(process.env.SALT);


        const hashPassword=await bcrypt.hash(req.body.password,salt);
        await new User({...req,password:hashPassword}).save();
        res.status(201).json({error:false,message:"User created successfully"});
    }
    catch(err){
        res.status(500).json({error:true,message:err});
    }
})


// Route for user login
router.get('/login',async(req,res)=>{
    try{

        // Validating the request body for login
        const {error}=logInBodyValidation(req.body);
        if(error){
            return res.status(400).json({error:true,message:error.details[0].message});
        }
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(401).json({error:true,message:"Invalid email or password"});
        }

        // Comparing the provided password with the hashed password
        const verifypassword=bcrypt.compare(req.body.password,user.password);
        if(!verifypassword){
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }
        const { accessToken, refreshToken } = await generateToken(user);
        res.status(200).json({error: false,accessToken,refreshToken,message: "Logged in sucessfully",});
    }
    catch(err){
        return res.status(500).json({error:true,message:"Internal server error"});
    }
})



module.exports=router;
