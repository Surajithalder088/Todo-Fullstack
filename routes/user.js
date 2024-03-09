import express from "express"
import { creatUser,loginUser ,updateUser,deleteUser,getAll} from "../controllers/user.js";
import {isAuthenticated} from "../middleware/auth.js"
const userRouter=express.Router();
userRouter.post("/register",creatUser)
userRouter.post("/login", loginUser)
//userRouter.get("/me",isAuthenticated, findUser)
userRouter.put("/userid/:id", updateUser)
userRouter.delete("/userid/:id", deleteUser)
userRouter.get("/",getAll)
export default userRouter;