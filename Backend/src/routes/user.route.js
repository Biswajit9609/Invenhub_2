import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
} from "../Controllers/user.controller.js";
const userRouter = Router();


userRouter.route("/register").post(registerUser);

// Secure Routes
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)
export { userRouter };