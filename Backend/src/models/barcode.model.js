import mongoose, { Schema } from "mongoose";

const barcodeSchema = new Schema({
    barcode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'store',
        required: true
    }
},{
    timestamps: true
})

export const barcode = mongoose.model('barcode', barcodeSchema);