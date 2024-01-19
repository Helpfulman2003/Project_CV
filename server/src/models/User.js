const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
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
    phone: {
      type: Number,
    },
    address: {
      city: {
        type: String,
      },
      address: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      url: {
        type: [],
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
