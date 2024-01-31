const messageService = require("../services/MessageService");

const messageController = {
    addMessage: async(req, res, next) => {
        try {
            const newMessage = await messageService.addMessage(req.body, next);
            return res.status(200).json(newMessage);
        } catch (error) {
            next(error);
        }
    },
    getAllMessage: async(req, res, next) => {
        try {
            const allMessages = await messageService.getAllMessage(req.body, next);
            return res.status(200).json(allMessages);
        }catch (error) {
            next(error);
        }
    },
    getAllUser: async(req, res, next) => {
        try {
            const allUsers = await messageService.getAllUser(req.shop.shopId, next);
            return res.status(200).json(allUsers);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = messageController