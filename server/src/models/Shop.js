const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "seller",
    },
    avatar: {
      url: {
        type: [],
      },
    },
    zipCode: {
      type: Number,
    },
    withdrawMethod: {
      type: Object,
    },
    availableBalancer: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        amount: { type: Number },
        status: { type: String, default: "Processing" },
        createAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop