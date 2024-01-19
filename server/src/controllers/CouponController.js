const client = require('../utils/redis')
const couponServices = require('../services/CouponService')
const couponController = {
    create: async(req, res, next) => {
        try {
            const shopId = req.shop.shopId
            const coupon = await couponServices.create(shopId, req.body, next)
            return res.status(200).json({
                success: true,
                message: 'Add coupon successfully',
                coupon
            })
        } catch (error) {
            next(error)
        }
    },
    getAllCouponOfShop: async(req, res, next) => {
        try {
            const coupons = await couponServices.getAllCouponOfShop(req.shop.shopId, next)
            return res.status(200).json(coupons)
        } catch (error) {
            next(error)
        }
    },
    deleteCouponOfShop: async(req, res, next) => {
        try {
            const coupon = await couponServices.deleteCouponOfShop(req.params.id, next)
            return res.status(200).json(coupon)
        } catch (error) {
            next(error)
        }
    },
    getValueCoupon: async(req, res, next) => {
        try {
           const couponCode = await couponServices.getValueCoupon(req.params.name)
           return res.status(200).json({
            couponCode
           })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = couponController;
