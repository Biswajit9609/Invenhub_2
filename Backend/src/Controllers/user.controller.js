import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { cookieOptions } from "../constants.js";
import {sendVerificationEmail,sendWelcomeEmail } from '../middlewares/email.middleware.js'
import jwt from "jsonwebtoken";


const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return { accessToken, refreshToken }
    } catch (error) {
        throw new apiError(500, "Failed to generate access and refresh tokens. Please try again later.");
    }
}


const registerUser = asyncHandler( async (req, res) => {
    // Steps for user registration
    // 1. Take user details from request body
    // 2. Validate for empty fields
    // 3. Check if user already exists
    // 2. Validate the user details
    // 5. Upload images to cloudinary (if applicable)
    // 6. Save the user to the database
    // 7. Check if the user is saved successfully
    // 8. Send a response back to the client

    // Take user details from request body
    const { fullName, email, password } = req.body;


    // Validate for empty fields
    if (!fullName || !email || !password) {
        throw new apiError(400, "Full name, email and password are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        throw new apiError(400, "Email is already registered. Please log in");
    }

    // email and password validation
    if (
    !(
        email.endsWith("@gmail.com") ||
        email.endsWith("@outlook.com") ||
        email.endsWith("@icloud.com") ||
        email.endsWith("@yahoo.com")
    )
) {
    throw new apiError(400, "Only Gmail, Outlook, iCloud, and Yahoo email addresses are supported");
}

    const passwordRequirementText = `
        Password must meet the following criteria:
        • At least 8 characters long
        • Contains at least one uppercase letter (A-Z)
        • Contains at least one lowercase letter (a-z)
        • Contains at least one number (0-9)
        • Contains at least one special character: ~!@#$%&*
        `
    if (
        (password.length < 8) ||
        (!/[A-Z]/.test(password)) ||
        (!/[a-z]/.test(password)) ||
        (!/[0-9]/.test(password)) ||
        (!/[!@#$%&*]/.test(password))
    ) {
        throw new apiError(400, passwordRequirementText);
    }

    // upload images to cloudinary (if applicable)
    let profileImage;
    const profileImageLocalPath = req.files?.profileImage?.[0]?.path;

    if (profileImageLocalPath) {
        try {
            const uploadedImage = await uploadOnCloudinary(profileImageLocalPath);
            profileImage = uploadedImage.url;
        } catch (error) {
            throw new apiError(500, "Failed to upload profile image. Please try again later.");
        }
    } else {
        profileImage = "https://res.cloudinary.com/dav3ltw82/image/upload/v1750945100/user_antmxf.png";
    }

    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString()
    await sendVerificationEmail(email,verificationToken)

    // Save the user to the database
    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        password,
        profileImage,
        verificationToken,
        verificationTokenExpiresAt:Date.now() + 300000
    });


    // Check if the user is saved successfully &
    // Send a response back to the client
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new apiError(500, "User registration failed. Please try again later.");
    }
    else{
        console.log(createdUser)
        return res.status(201).json(
        new apiResponse(
        201,
        {
            user: createdUser,
        },
        "User registered successfully"
    ));
    }

})


const verifyEmail= asyncHandler(async(req,res)=>{
    try {
        const {code}=req.body 
        const user= await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
        if (!user) {
            return res.status(400).json({success:false,message:"Invalid or Expired Code"})
        }
        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save()
        await sendWelcomeEmail(user.email,user.fullName)
        return res.status(200).json({success:true,message:"Email Verified Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,message:"internal server error"})
    }
})


const loginUser = asyncHandler(async(req,res)=>{
    // Steps for user login
    // 1. get data from frontend
    // 2. check for empty fields
    // 3. check if user exist or not
    // 4. check is password is correct
    // 4. update refresh token & access token
    // 5. send cookie



    const { email, password } = req.body

    if ( !email || !password ){
        throw new apiError(400, "Email and password are required")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new apiError(404, "User not found. Please check your email and try again.")
    }
    if (!(user.isVerified)) {
        throw new apiError(403, "Please verify your email before logging in");
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new apiError(401, "Incorrect password. Please try again.")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
        new apiResponse(
            200,
            {
                user : loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
})


const logoutUser = asyncHandler(async(req,res)=>{
    await User.findOneAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            },
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken",cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(
        new apiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})


const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new apiError(401,"Unauthorized access. Refresh token missing")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new apiError(400,"Invalid refresh token. User not found")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new apiError(403, "Refresh token mismatch")
        }
        const { accessToken,refreshToken } = await generateAccessAndRefreshToken(user._id)
        return res
        .status(200)
        .cookie("accessToken", accessToken,cookieOptions)
        .cookie("refreshToken", refreshToken,cookieOptions)
        .json(
            new apiResponse(
                200,
                {accessToken,refreshToken},
                "Access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new apiError(401,"Invalid or expired refresh token")
    }
})


const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user._id)
    const isPasswordValid = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordValid){
        throw new apiError(400,"Incorrect Password")
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {},
            "Password Changed Successfully"
        )
    )
})


const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {
                user : req.user
            },
            "User fetched"
        )
    )
})


const updateUserDetails = asyncHandler(async(req,res)=>{
    const { fullName, email } = req.body
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                fullName,
                email
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            user,
            "Account details updated Successfully"
        )
    )
})


const updateUserProfileImage = asyncHandler(async(req,res)=>{
    const newProfilePictureLocalPath = req.file?.path

    if(!newProfilePictureLocalPath){
        throw new apiError(400,"No image selected")
    }
    
    const profileImage = await uploadOnCloudinary(newProfilePictureLocalPath)
    if(!profileImage.url){
        throw new apiError(500, "Image upload failed, please try again later")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                profileImage: profileImage.url
            }
        },
        {
            new: true
        }
    ).select("-password")
    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            user,
            "Profile Image Updated Successfully"
        )
    )
})


export { 
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserDetails,
    updateUserProfileImage
};