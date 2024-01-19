const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart: {
        type: Object
    },
    shippingAddress: {
        type: Object
    },
    user: {
        type: Object
    },
    totalPrice:{
        type: Number,
    },
    status: {
        type: String,
        default: 'Processing'
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        type: {
            type: String
        }
    },
    paidAt: {
        type: Date,
        default: Date.now()
    },
    deliveredAt: {
        type: Date
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
