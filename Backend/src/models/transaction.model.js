import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'store',
        required: true
    },
    customerName: {
        type: String,
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'online'],
        default: 'cash'
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'cancelled'],
        default: 'completed'
    },
    type: {
        type: String,
        enum: ['sale', 'return','purchase'],
        default: 'sale'
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    couponCode: {
        type: String,
        trim: true,
        default: null
    }
},{
    timestamps: true
})

export const transaction = mongoose.model('transaction', transactionSchema);