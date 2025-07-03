import mongoose , { Schema } from 'mongoose';

const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    gstNumber: {
        type: String,
        unique: true,
    }
},{
    timestamps: true
})

export const store = mongoose.model('store', storeSchema);