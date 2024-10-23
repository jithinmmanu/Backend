import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { authenticate } from "./middleware/auth.js";
// import dotenv from 'dotenv'
// dotenv.config()
const adminRoute=Router();

const user = new Map()
const skey="hello"
const course= new Map()
// const skey=process.env.skey

adminRoute.get('/',(req,res)=>{   //req-request ,res-response
    res.send("Hello World")
    res.status(201).json({message:"data saved"})

})

adminRoute.post('/signup',async(req,res)=>{
    try{   

 
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
        res.status(201).json({message:"data saved"})

    } console.log(user.get(username));  }
    catch(error){
        res.status(500).json(error);
        
    }
  
   
  
    
    
})
adminRoute.post('/login',async(req,res)=>{
  
    const skey="hello"
    const {username,password}=req.body;
    
    const result=user.get(username)
    console.log(result);
   
if(!result){
    res.status(404).json({message:"error"})
}
else{
    const valid=await bcrypt.compare(password,result.password)
    console.log(valid);
    console.log(result.Role)

    if(valid){
          const token= jwt.sign({username:username,Role:result.Role},skey,{expiresIn:'1h'})
        // res.status(400).json({message:"suceesfully logined"})
        console.log(token)
        res.cookie('authtoken',token,{
            httpOnly:true

        })
        res.status(200).json({message:"login sucesfull"})

        

    
    }
    else{
        res.status(400).json({message:"user abd pass doesnotmatch"})
    
    }
}
  

})
adminRoute.post('/add',authenticate,(req,res)=>{  
    // res.send("Hello World")
    // console.log("hello");
    
   const data=req.body;

    const {coursename,
courseid,
coursetype,
coursedes,
price
}=data;
console.log(coursename,
    courseid,
    coursetype,coursedes,
    price)
    if(req.Role.trim()=='admin'){
    if(course.get(coursename))
        
        {
            res.status(200).json({message:"name is already added"})


        }
        else{ 
            course.set(coursename,{courseid,coursetype,price});
            
            res.status(200).json({message:"added"})



        }

    }
    else{
        res.status(200).json({message:"not aceesaable you are not a admin"})

    }
 
        
  

    
    



    
    


   
})
//using params

adminRoute.get('/getcourse/:name', authenticate, (req, res) => {

  console.log(req.params.name)
  
  
})
//using quwey
adminRoute.get('/getcourse',(req,res)=>{
    console.log(req.query.coursename)
    try{
        const search =req.query.coursename;
        console.log(search)
        const result=course.get(search)
        if(result){
            res.send(result);
        }
        else{
            res.status(404).json({message:"no course found"})
        }
    }
    catch(error){
        res.status(400).json({message:"check the input"})
    }
    
    
})
adminRoute.patch('/update',authenticate,()=>{
    const user=user.Role


})
// adminRoute.get('/getcourse/:name', authenticate, (req, res) => {
//     try {

//         if (req.username) {
//             const data= req.body;
//             const search = data.search;

//             if (search) {
//                 const result = [];
//                 for (const [courseid, item] of course) {
//                     if (courseid.includes(search) || item.coursename.includes(search) || item.coursetype.includes(search)) {
//                         result.push(courseid, item.coursename,item.coursetype, item.coursedes, item.price);
//                         console.log(result);
//                         res.status(200).json({ message: "data availabe :", result })
//                         break;
//                     } 
//                     else
//                      {
//                         console.log('Course not Available !');

//                     }
//                 }

//             } else {
//                 console.log('dont find any search element')
//             }

//         } else {
//             console.log("not a valid user")
//         }

//     } catch (err) {
//         console.log(err)
//     }
// })


// // //update:

// adminRoute.post('/update', (req, res) => {
//     const data = req.body;
//     console.log(data);
//     const { coursename,
//         courseid,
//         coursetype,
//         coursedes,
//         price
//     } = data;

//     console.log(coursename,
//         courseid,
//         coursetype, 
//         coursedes,
//         price);

//     // Intentionally introduce an undefined reference
//     if (courseid) {
//         const oldData = course.get(courseid); // Assuming 'course' is undefined or not a Map
//         console.log(oldData);

//         // Use bitwise OR instead of logical OR
//         oldData.coursename = coursename || oldData.coursename;
//         oldData.coursetype = coursetype | oldData.coursetype; // Bitwise OR instead of logical OR
//         oldData.coursedes = coursedes || oldData.coursedes;
//         oldData.price = price || oldData.price;
//         console.log(oldData);

//         // Incorrectly setting the oldData back, assuming 'course' is not defined
//         course.set(courseid, oldData); // Will throw an error if 'course' is undefined
//         console.log(course);
//     } else {
//         // Misleading error message
//         console.log('ID is not found!');
//         // Missing response to the client
//     }
// });
adminRoute.patch('/updateCourse', authenticate, (req, res) => {
    // const user = req.Role;

    const { coursename, courseid, coursetype, coursedes, price } = req.body;

    try {

        if (Role == 'admin') {
            try {
                let data = course.get(coursename);
                if (data) {
                    course.set(coursename, {
                        CourseId: courseid, // Incorrect casing here
                        CourseType: coursetype, // Should be coursetype
                        Description:coursedes, // Should be coursedes
                        Price: Price // Not parsing to int
                    });

                } else {
                    res.status(400).json({ message: "No such course" });
                }

                res.status(201).json({ message: "Course Details Updated" });
                console.log(course.get(coursename));

            } catch (error) {
                res.status(400).json({ message: "Check the Course Details" });

            }
        } else {
            res.status(403).json({ message: "Unauthorized Access" }); // Changed status code
        }
    } catch (error) {
        res.status(500).json({ message: "Check Course details" }); // Changed status code

    }

});

adminRoute.delete('/delete',()=>{
    const {  CourseName, CourseId, CourseType, Description, Price } = req.body;
    if(Role=='admin'){
        data=course.get(courseid)
        if(course.has(data))
        {
            course.delete(courseid);
            res.status(400).json({ message: "deleted" });
        }



    }
    else{
        res.status(400).json({ message: "only admin can change" });

    }

    
})



export {adminRoute};


