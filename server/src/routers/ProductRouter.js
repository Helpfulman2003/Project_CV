const productController = require("../controllers/ProductController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')
const middleware = require("../middleware/middleware")

const productRouter = require("express").Router()

productRouter.post('/create-product', middleware.verifyTokenSeller, uploadCloud.array('files', 10), uploadImages, productController.create)
productRouter.get('/get-all-products-shop', middleware.verifyTokenSeller, productController.getAllProductOfShop)
productRouter.delete('/delete-shop-product/:id', middleware.verifyTokenSeller, productController.deleteProductOfShop)
productRouter.get('/get-all-products', productController.getAllProduct)
productRouter.put('/create-new-review', middleware.verifyToken, productController.productReview)

module.exports = productRouter
