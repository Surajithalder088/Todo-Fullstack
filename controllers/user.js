import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export  const creatUser=async (req,res)=>{
      const {name,email,password}=req.body;
      let user= await User.findOne({email})
      if(user){
            return res.status(404).json({
                  success:false,
                  messege:"User already exist",
            })
      } 
      const hashPassword=  bcrypt.hashSync(password);//hashing password by bcrypt
      user=await User.create({
            name,
            email,
            password:hashPassword,
      })
      const token =jwt.sign({_id:user._id},process.env.JWT_SECRET);
      res.cookie("token",token,{                   // sending cookie to login automatically on register
            httpOnly:true,
            expires:new Date(Date.now()+3600*1000)
      }).status(201).json({
            messege:"sucessfully created",
            user,
            token,
      })
}
export  const loginUser=async (req,res)=>{
      const {email,password}=req.body;
      let user= await User.findOne({email})
      if(!user){
            return res.redirect("/register ")
      } 
      const isMatch=bcrypt.compareSync(password,user.password)
      if(!isMatch)return res.redirect("login ")
      const token =jwt.sign({_id:user._id},process.env.JWT_SECRET);
      res.cookie("token",token,{
            httpOnly:true,
           maxAge:15*60*1000,
      })
      .json({
            user
      })
    ; 
}
// export  const findUser=async (req,res)=>{
//       res.status(200).json({
//             user:req.user
//       })
// }


export  const updateUser=async (req,res)=>{
      const {id}=req.params;
      let user
      try{
      user= await User.findById({_id:id})
}
      catch(e){
return console.log(e)
      }
      if(!user) return res.json({messege:" not found"})
     res.json({
      sucess:true,
      messege:"updated",
      user
     })
}
export  const deleteUser=async (req,res)=>{
      const {id}=req.params;
      let user
      try{
      user= await User.findById({_id:id})
}
      catch(e){
return console.log(e)
      }
      if(!user) return res.json({messege:" not found"})
      
     res.json({
      sucess:true,
      messege:"deleted",
     
     })
}

export const getAll=async (req,res)=>{
let user=await User.find();
res.json({
      user
})
}