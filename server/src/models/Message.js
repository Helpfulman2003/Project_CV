const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {type: String},
    user: Array, // array gồm 2 id của người gửi và người nhận
    senderId: {type: String}
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
