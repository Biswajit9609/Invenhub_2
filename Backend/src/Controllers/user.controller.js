import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";


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
        throw new apiError(400, "Please provide all required fields");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        throw new apiError(400, "User already exists with this email");
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
    throw new apiError(400, "Invalid email address");
}

    const passwordRequirementText = `
        Password must meet the following criteria:
        • At least 8 characters long
        • Contains at least one uppercase letter (A-Z)
        • Contains at least one lowercase letter (a-z)
        • Contains at least one number (0-9)
        • Contains at least one special character: ~!@#$%&*
        `.trim();
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
            throw new apiError(500, "Error uploading profile image");
        }
    } else {
        profileImage = "https://res.cloudinary.com/dav3ltw82/image/upload/v1750945100/user_antmxf.png";
    }

    // Save the user to the database
    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        password,
        profileImage
    });


    // Check if the user is saved successfully &
    // Send a response back to the client
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new apiError(500, "User registration failed");
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

export { registerUser };