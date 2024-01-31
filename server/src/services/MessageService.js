const createError = require("../error");
const Message = require("../models/Message");
const User = require("../models/User");

const messageService = {
  addMessage: async (message, next) => {
    const newMessage = await Message.create({
      message: message.message,
      user: [message.from, message.to],
      senderId: message.from,
    });
    return {
      newMessage,
    };
  },
  getAllMessage: async ({ from, to }, next) => {
    const allMessages = await Message.find({
      user: {
        $all: [from, to],
      },
    }).sort({ createdAt: 1 });
    return {
      allMessages,
    };
  },
  getAllUser: async (shopId, next) => {
    const data = await Message.find({ user: { $in: [`${shopId}`] } });
    const allUser = data.map((item) => item.user).flat();
    const users = [...new Set(allUser)];
    const allUserChat = users.filter((user) => user !== shopId);
    const allUsers = []
    for(const userId of allUserChat) {
      const user = await User.findOne({_id: userId})
      allUsers.push(user);
    }
    return {
      allUsers,
    };
  },
};

module.exports = messageService;
