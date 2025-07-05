import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    registerUser,
    loginUser,
    logoutUser 
} from "../Controllers/user.controller.js";
const userRouter = Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT,logoutUser)
export { userRouter };