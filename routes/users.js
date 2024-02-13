const {Router}=require('express');
const auth=require('../middleware/auth');
const router=Router();


//router to fetch data from api 
router.get('/data',auth,async(req,res)=>{
    const url="https://jsonplaceholder.typicode.com/todos";
    try{
        const response=await fetch(url);
        const jsonResponse = await response.json();
        res.status(200).json({error:false,message:jsonResponse})
    }
    catch(err){
        res.status(500).json({error:true,message:"Internal server error"})
    }
})
