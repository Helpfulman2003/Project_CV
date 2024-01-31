const shopController = require("../controllers/ShopController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')
const middleware = require("../middleware/middleware")

const shopRouter = require("express").Router()

shopRouter.post('/shop-login', shopController.login)
shopRouter.get('/shop-logout', middleware.verifyTokenSeller, shopController.logout)
shopRouter.post('/refresh-token', shopController.refreshToken)
shopRouter.post('/shop-create', uploadCloud.array('files', 10), uploadImages ,shopController.register)

module.exports = shopRouter
