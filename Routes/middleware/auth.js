import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
 const skey="hello"
// dotenv.config()
// const skey=process.env.skey
const authenticate=(req,res,next)=>{
   
    
     const cookies=req.headers.cookie;
     console.log(cookies)

    const cookie=cookies.split(';');
    for( let items of cookie){
    const [name,token]=  items.trim().split('=')
    if(name=='authtoken'){
    const verified=   jwt.verify(token,skey)
    console.log(verified);
  req.username=verified.username;
  req.Role=verified.Role;
 

    break;
        

    }
    }
    next();

  


}

export {authenticate};