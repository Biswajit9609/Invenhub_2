import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            throw new Error('No file path provided for upload');
        }
        const filePath = await cloudinary.uploader.upload(localFilePath, {
            folder: 'invenhub-users',
            resource_type: 'auto',
        })
        fs.unlinkSync(localFilePath); // Delete the file after upload
        console.log(`File uploaded to Cloudinary`);
        return filePath
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}

export { uploadOnCloudinary };