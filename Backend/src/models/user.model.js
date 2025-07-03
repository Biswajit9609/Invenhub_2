import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    fullName: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee',
    },
    profileImage: {
        type: String,
        default: 'https://res.cloudinary.com/dav3ltw82/image/upload/v1750945100/user_antmxf.png',
    },
    storeId:{
        type: Schema.Types.ObjectId,
        ref: 'Store',
        default: null,
    },
    refreshToken: {
        type: String,
        default: null,
    }
},{timestamps: true});


export const user = mongoose.model('user',userSchema)