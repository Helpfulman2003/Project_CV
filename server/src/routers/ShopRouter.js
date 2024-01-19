const shopController = require("../controllers/ShopController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')

const shopRouter = require("express").Router()

shopRouter.post('/shop-login', shopController.login)
shopRouter.post('/refresh-token', shopController.refreshToken)
shopRouter.post('/shop-create', uploadCloud.array('files', 10), uploadImages ,shopController.register)

module.exports = shopRouter
