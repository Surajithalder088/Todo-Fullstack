import Task from "../models/task.js"

export const newTask= async (req,res,next)=>{
      const {title,description} =req.body;
     const task=new Task({
            title,
            description,
            user:req.user,
      })
      await task.save()
      console.log("work 1");
      res.status(200).json({
            sucess:true,
            messege:"task added",
          
      })
      console.log("work 2");
}