const expres=require('express');
const dbConnect=require('./dbConnect');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth');
const refreshTokenRoutes=require('./routes/refreshToken');
const userRoutes=require('./routes/users');
const app=expres();
dotenv.config();

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

//Mounting the routes for various funtion 
app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);


//connecting to database
dbConnect();
const port = process.env.PORT || 8080;

// Starting the server and listening on the specified port
app.listen('port',()=>{
    console.log(`listening on port ${port}`);
})
