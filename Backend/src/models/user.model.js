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

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({ 
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN 
    });
}


userSchema.methods.generateAccessToken = function() {
    return jwt.sign({ 
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, 
    { 
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN 
    });
}

export const user = mongoose.model('user',userSchema)