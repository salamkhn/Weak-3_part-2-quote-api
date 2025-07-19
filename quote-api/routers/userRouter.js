import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

export const userRouter = Router();

// @purpose adduser
//method =>post
//endpoing api/user/insert
userRouter.post("/insert", registerUser);

// @purpose loginuser
//method =>post
//endpoing api/user/login
userRouter.post("/login", loginUser);
