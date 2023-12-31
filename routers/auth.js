const express=require("express");

const Userroutes=express.Router();
const UserModel=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const SCREAT_KEY="NodesApi"

// singup 

Userroutes.post("/signup",async(req,res)=>{
    
    const {email,password,username,fullname,role,phone,poste,grade,image}=req.body
    try{
        const existuser =await UserModel.findOne({email:email});
        if(existuser){
            return res.status(400).json({message:"user laredy exist"})
        }
        const haspassword=await bcrypt.hash(password,10)

        const result=await UserModel.create({
            username:username,
            password:haspassword,
            fullname : fullname ,
            role: role,
            email:email,
            phone:phone,
            poste:poste,
            grade:grade,
            image:image,
        });
        const token=jwt.sign({email:result.email,id:result._id},SCREAT_KEY)
        res.status(200).json({user:result,token:token})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"some thing went wrong "})
    }

})

//login 
Userroutes.post("/login", async(req, res) => {
    const{email,password}=req.body
    try {
      const existuser = await UserModel.findOne({ email: email });
      if (!existuser) {
        return res.status(400).json({ message: "user not found " });
      }
      //password check 
      const matchpassword = await bcrypt.compare(password, existuser.password);
      if (!matchpassword) {
        return res.status(400).json({ message: "password doesnot match " });
      }
      const token = jwt.sign(
        { email: existuser.email, id: existuser._id },
        SCREAT_KEY
      );
      res.status(200).json({ user: existuser, token: token });
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({ message: "some thing went wrong " });
    }
  });
  
  module.exports=Userroutes