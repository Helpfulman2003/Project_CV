const eventController = require("../controllers/EventController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')
const middleware = require("../middleware/middleware")

const eventRouter = require("express").Router()

eventRouter.post('/create-event', middleware.verifyTokenSeller, uploadCloud.array('files', 10), uploadImages, eventController.create)
eventRouter.get('/get-all-events-shop', middleware.verifyTokenSeller, eventController.getAllEventOfShop)
eventRouter.delete('/delete-shop-event/:id', middleware.verifyTokenSeller, eventController.deleteEventOfShop)
eventRouter.get('/get-all-events', eventController.getAllEvent)

module.exports = eventRouter
