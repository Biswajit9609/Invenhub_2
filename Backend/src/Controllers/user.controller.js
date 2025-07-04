import { asyncHandler } from "../utils/asyncHandler.utils.js";
const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User registered successfully",
    })
})

export { registerUser };