const expres=require('express');
const dbConnect=require('./dbConnect');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth');
const refreshTokenRoutes=require('./routes/refreshToken');
const userRoutes=require('./routes/users');
const app=expres();
dotenv.config();


app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);


dbConnect();
const port = process.env.PORT || 8080;
app.listen('port',()=>{
    console.log(`listening on port ${port}`);
})