import express from "express"
import {isAuthenticated} from "../middleware/auth.js"
import {newTask} from "../controllers/task.js"
const taskRouter=express.Router();

taskRouter.post("/new",isAuthenticated, newTask)


export default taskRouter;