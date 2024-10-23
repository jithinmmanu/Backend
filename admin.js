

// import express,{json} from 'express';
// import bcrypt from 'bcrypt';
// // import cores from "cores";
// const app=express();
// app.use (json())

// const port=8000;
// const user=new Map();
// app.get('/',(req,res)=>{
//     res.send("hello world");
//     // res.status(400).send('hello world')


// })
// app.post('/signup',async(req,res)=>{
//     console.log("hi");
//     // console.log(req.body);
//     const data=req.body;
//     // console.log(data);
    
//     console.log(data.Firstname)
//     const fname=data;
//     const {
//         Firstname,
//         Lastname,
//         Username,
//         Password,
//         Role
//     }=data;
//     console.log(Firstname);
//     user.set(Username,{
//         Firstname,
//         Lastname,
//         Username,
//         Password,
//         Role

        
//     });
//     const newP =bcrypt.hash(Password,10)
//     console.log(newP);
//     console.log(user.get(Username))



    
// })
// app.listen(port,()=>{
//     console.log(`server is listening to the ${port}`)

// })
