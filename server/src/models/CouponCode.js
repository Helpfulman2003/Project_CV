const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema(
  {
    name: {
        type: String,
    },
    value: {
        type: Number
    },
    minAmount: {
        type: Number
    },
    maxAmount: {
        type: Number
    },
    shopId: {
        type: mongoose.Types.ObjectId,
        ref: "Shop"
    },
    productSelected: {
        type: String
    }
  },
  { timestamps: true }
);

const CouponCode = mongoose.model('CouponCode', couponCodeSchema)
module.exports = CouponCode
