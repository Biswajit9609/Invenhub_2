import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'store',
        required: true
    }
},{
    timestamps: true
})

export const category = mongoose.model('category', categorySchema);