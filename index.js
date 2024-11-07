import express,{json} from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { adminRoute } from './Routes/adminroutes.js';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv'
// dotenv.config()


const app=express();
app.use(cors({
    origin:'http://127.0.0.1:5500',
    // origin:'*',
    credentials:true
}))
app.use(json())
app.use(cookieParser())
app.use('/',adminRoute)

const port=8000;
// const port=process.env.port


const user = new Map()

app.get('/',(req,res)=>{   //req-request ,res-response
    res.send("Hello World")
    res.status(201).json({message:"data saved"})

})

app.post('/signup',async(req,res)=>{
    try{
A
 
    console.log("hi")
    
    const data=(req.body);
    console.log(data.firstname)
    // console.log(data);
    const {firstname,lastname,username,password,Role}=data;
    console.log(firstname);
    const newPassword = await bcrypt.hash(password,10)
    user.set(username,{firstname,lastname,password:newPassword,Role});
    console.log(newPassword);
    
 
    if(user.has(username)){
        res.status(400).json({message:"user already exist"})
    }
    else{
        // res.status(201).json({message:"the user is not exist"})
        user.set(username,{firstname,lastname,password:newPassword,Role});
    } console.log(user.get(username));  }
    catch(error){
        res.status(500).json(error);
        
    }
  
       
})



app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
    
})