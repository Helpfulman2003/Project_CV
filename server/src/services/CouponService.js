const createError = require("../error");
const Shop = require("../models/Shop");
const CouponCode = require("../models/CouponCode");
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')

const couponService = {
  create: async (shopId, body, next) => {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      next(createError(404, "Shop Id is invalid!"));
    }
    const isCouponCodeExists = await CouponCode.findOne({name: body.name})
    if(isCouponCodeExists) {
      next(createError(400, 'CouponCode already exists!'))
    }
    // body = Object.assign({}, body);
    // if (Object.keys(body).length === 0) {
    //   return next(createError(400, "Body must not be empty!"));
    // }
    const coupon = await CouponCode.create({ ...body, shopId: shopId }, {new: true});
    return {
        coupon
    }
  },
  getAllCouponOfShop: async(shopId, next) => {
    const coupons = await CouponCode.find({shopId: {$eq: shopId}})
    return {
      coupons
    }
  },
  deleteCouponOfShop: async(id, next) => {
    const objectId = new mongoose.Types.ObjectId(id)
    const coupon = await CouponCode.findById({_id: objectId})
    if(!coupon) {
      next(createError(404, 'Coupon is not found with this id'))
    }
    await CouponCode.deleteOne({_id: objectId})
    return {
      success: true,
      message: "Coupon deleted successfully!",
    }
  },
  getValueCoupon: async(name) => {
    const couponCode = await CouponCode.findOne({name: name})
    return {
      couponCode
    }
  }
};

module.exports = couponService