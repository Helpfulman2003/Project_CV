const orderController = require("../controllers/OrderController")
const middleware = require("../middleware/middleware")

const orderRouter = require("express").Router()

orderRouter.post('/create-order'/*,middleware.*/, orderController.createNewOrder)
orderRouter.get('/get-seller-all-orders', middleware.verifyTokenSeller, orderController.getAllOrderOfShop)
orderRouter.get('/get-user-all-orders', middleware.verifyToken, orderController.getAllOrderOfUser)
orderRouter.put('/update-order-status/:id', middleware.verifyTokenSeller, orderController.updateOrderStatus)


module.exports = orderRouter
