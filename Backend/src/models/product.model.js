import mongoose , {Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    expiryDate: {
        type: Date,
    },
    lowStockThreshold: {
        type: Number,
        default: 5,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    barcode:{
        type: String,
        unique: true,
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

export const product = mongoose.model('product', productSchema);