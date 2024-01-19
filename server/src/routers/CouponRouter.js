const couponController = require("../controllers/CouponController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')
const middleware = require("../middleware/middleware")

const couponRouter = require("express").Router()

couponRouter.post('/create-coupon', middleware.verifyTokenSeller, couponController.create)
couponRouter.get('/get-all-coupons-shop', middleware.verifyTokenSeller, couponController.getAllCouponOfShop)
couponRouter.delete('/delete-shop-coupon/:id', middleware.verifyTokenSeller, couponController.deleteCouponOfShop)
couponRouter.get('/get-coupon-value/:name', middleware.verifyToken, couponController.getValueCoupon)

module.exports = couponRouter
