const orderService = require("../services/OrderService");

const orderController = {
    createNewOrder: async(req, res, next) => {
        try {
            const newOrder = await orderService.createNewOrder(req.body)
            return res.status(200).json(newOrder)
        } catch (error) {
            next(error)
        }
    },
    getAllOrderOfShop: async(req, res, next) => {
        try {
            const orderShop = await orderService.getAllOrderOfShop(req.shop.shopId, next)
            return res.status(200).json(orderShop)
        } catch (error) {
            next(error)
        }
    },
    updateOrderStatus: async(req, res, next) => {
        try {
            const order = await orderService.updateOrderStatus(req.params.id, req.body.status, req.shop.shopId, next)
            return res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    },
    getAllOrderOfUser: async(req, res, next) => {
        try {
            const orderUser = await orderService.getAllOrderOfUser(req.user.userId, next)
            return res.status(200).json(orderUser)
        } catch (error) {
            next(error)
        }
    }
};

module.exports = orderController;
