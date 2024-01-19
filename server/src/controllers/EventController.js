const client = require('../utils/redis')
const eventServices = require('../services/EventService')
const eventController = {
    create: async(req, res, next) => {
        try {
            const shopId = req.shop.shopId
            const event = await eventServices.create(shopId, req.body, req.img, next)
            return res.status(200).json({
                success: true,
                message: 'Add event successfully',
                event
            })
        } catch (error) {
            next(error)
        }
    },
    getAllEventOfShop: async(req, res, next) => {
        try {
            const events = await eventServices.getAllEventOfShop(req.shop.shopId, next)
            return res.status(200).json(events)
        } catch (error) {
            next(error)
        }
    },
    deleteEventOfShop: async(req, res, next) => {
        try {
            const event = await eventServices.deleteEventOfShop(req.params.id, next)
            return res.status(200).json(event)
        } catch (error) {
            next(error)
        }
    },
    getAllEvent: async(req, res, next) => {
        try {
            const events = await eventServices.getAllEvent()
            res.status(200).json({
                success: true,
                message: 'All event',
                events
            })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = eventController;
