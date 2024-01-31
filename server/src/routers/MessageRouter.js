const messageRouter = require('express').Router()
const messageController = require('../controllers/MessageController')
const middleware = require("../middleware/middleware")

messageRouter.post('/add-message', middleware.verifyToken, messageController.addMessage)
messageRouter.post('/get-all-message', middleware.verifyToken, messageController.getAllMessage)
messageRouter.get('/get-all-user', middleware.verifyTokenSeller, messageController.getAllUser)

module.exports = messageRouter
