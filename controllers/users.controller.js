const userModel = require("../models/users.model");
//importing TaskModel
const taskModel = require("../models/task.model");
//loading  the jwt token
const jwt = require("jsonwebtoken");
//loading the dotenv
const env = require('dotenv').config();

const bcryptjs = require('bcryptjs');

//Password hashing rules.
const hashedPass = async(inputPass)=>{
      const  hashed= await bcryptjs.hash(inputPass,10);
      return hashed;
}
const signup = async(req,res)=>{
    try{ 
        let pass1 = req.body.pass1;
        let hashed = await hashedPass(pass1);
   const userObj= await userModel.create({
        "name":req.body.name,
        "phone":req.body.phone,
        "email":req.body.email,
        "pass1":hashed
    });
    if(!userObj){
        res.status(403).json({"message":"signup_error"});
    }else{
        res.status(200).json({"message":"signup_success"});
    }

    }catch(error){
        res.status(403).json(error);
    }
}

const showTasksbyUserID=async(user_id)=>{
       try{
            const tasks = await taskModel.find({"user_id":user_id})
                                .populate({"path":"user_id"})
                                .exec();

            if(tasks)
                return tasks;
       }
       catch(error){
        console.log(error);
       }
}
const signin = async(req,res)=>{
      const user =  await userModel.findOne({"email":req.body.email}).exec();
      if (user){
          {
            const db_hashed_pass = user.pass1;
            const isValid = bcryptjs.compareSync(req.body.pass1,db_hashed_pass) ? true : false;
            if(isValid){
                //if login successfull then we will create the token
                  const token = jwt.sign({"_id":user._id},process.env.SECRET_KEY,{expiresIn:'1h'});

                //res.status(200).json({"message":"login successfull","user":user});
                const tasks = await showTasksbyUserID(user._id);
                res.status(200).json({"message":"login successfull","tasks":tasks,"token":token});
            }else{
                res.status(200).json({"message":"Invalid Username or Password"});
            }
          }
      }else{
         res.status(200).json({"message":"no such user exists"});
      }
}

module.exports ={
    signup,signin
};

console.log("user controller is working");