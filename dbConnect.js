const mongoose=require('mongoose');
const dotenv=require('dotenv');


const dbConnect = async ()=>{
    dotenv.config();
    try {

        // Connecting to the MongoDB database using the connection string from environment variables
        mongoose.connect(process.env.DB);

        // Event listener for successful connection
        mongoose.connection.on("connected",()=>{
            console.log('DB connected successfully');
        })
    }catch(err){
        console.log("Error while connecting");
    }
}

module.exports=dbConnect;
