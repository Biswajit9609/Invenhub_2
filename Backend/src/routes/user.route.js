import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js";
const userRouter = Router();
userRouter.route("/register").post(registerUser);

export { userRouter };