const paymentController = require("../controllers/PaymentController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')
const middleware = require("../middleware/middleware")

const paymentRouter = require("express").Router()

paymentRouter.post('/success', paymentController.success)
paymentRouter.post('/payment', paymentController.create)

module.exports = paymentRouter
