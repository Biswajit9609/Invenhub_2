import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler( async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new apiError(401, "Access denied. No token provided.")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if(!user){
            throw new apiError(401,"Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new apiError(401, error.message || "Invalid Access Token");
    }
})