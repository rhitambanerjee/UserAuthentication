const mongoose=require('mongoose');
const dotenv=require('dotenv');


const dbConnect = async ()=>{
    dotenv.config();
    try {
        mongoose.connect(process.env.DB);
        mongoose.connection.on("connected",()=>{
            console.log('DB connected successfully');
        })
    }catch(err){
        console.log("Error while connecting");
    }
}

module.exports=dbConnect;