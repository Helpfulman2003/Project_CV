const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    images: {
      url: {
        type: [{}],
      },
    },
    tags: {
      type: String
    },
    ratings: {
      type: Number,
    },
    reviews: [
      {
        rating: {
          type: Number
        },
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User"
        },
        comment: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now()
        }
      }
    ]
    ,
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "Shop",
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema)
module.exports = Product
