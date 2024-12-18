import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        required: true
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        default: 'stripe'
    },
    paymentIntentId: {
        type: String,
        unique: true,
        sparse: true
    },
    shippingAddress: {
        name: String,
        address: String,
        tel: String,
        postalCode: String,
        note: String
    }
}, {
    timestamps: true
});

// ค้นหาออเดอร์ด้วย Payment Intent ID
OrderSchema.statics.findByPaymentIntent = function(paymentIntentId) {
    return this.findOne({ paymentIntentId });
};

// อัพเดทสถานะการชำระเงิน
OrderSchema.methods.updatePaymentStatus = function(status) {
    this.status = status;
    return this.save();
};

const Order = mongoose.models?.Order || mongoose.model('Order', OrderSchema);

export default Order;
