import mongoose from "mongoose"

 const connectDB=async()=>{
await mongoose.connect("mongodb://localhost:27017/Todo").then(()=>{console.log("database connected");})
.catch((e)=>{console.log("not data");})
 }
export default connectDB;