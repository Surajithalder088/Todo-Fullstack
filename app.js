import express from "express"
import {config}from "dotenv"
import connectDB from "./data/database.js"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser"
import {isAuthenticated} from "./middleware/auth.js"
import User from "./models/user.js"
import Task from "./models/task.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
config({
      path:"./data/config.env"
})
const app=express()

//using middleware
app.use(express.json());
//using router
app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)
app.use(cookieParser());

app.get("/",(req,res)=>{
      res.cookie("key","value")
      .send("<h1>Nice Work</h1>")
      console.log(req.cookies);
})

//-----------------login API

app.get("/api/v1/user/me",isAuthenticated, async (req,res)=>{
      
      res.status(200).json({
            user:req.user.name
      })
})

//---------------------------logout API

app.get("/api/v1/user/logout", async (req,res)=>{
      
      res.cookie("token", "",{
            expires:new Date(Date.now())
      }).send("log out")
      let token=req.cookies
     
    //  const decoded=jwt.verify(lastDeleted,process.env.JWT_SECRET) 
      console.log(`last signed profile was ${token}`);
}
)

// app.post("/api/v1/task/new",isAuthenticated,async (req,res,next)=>{
//       const {title,description} =req.body;
//      const task=new Task({
//             title,
//             description,
//             user:req.user,
//       })
//       await task.save()
//       console.log("work 1");
//       res.status(200).json({
//             sucess:true,
//             messege:"task added",
          
//       })
//       console.log("work 2");
// })

app.listen(6700,()=>{
      connectDB();
console.log(`server is running on port ${process.env.PORT}`)
})