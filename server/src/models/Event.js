const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
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
    startDate: {
        type: Date
    },
    finishDate: {
        type: Date
    },
    status: {
        type: String,
        default: 'Running'
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
    tags: {
        type: String
    },
    images: {
      url: {
        type: [{}],
      },
    },
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

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
