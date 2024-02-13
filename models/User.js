const mongoose=require('mongoose');


//creating a schema for the user
const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})

const User=mongoose.model("User",UserSchema);

module.exports=User;
