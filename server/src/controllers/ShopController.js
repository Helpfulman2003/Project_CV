const shopService = require("../services/ShopService");
const jwt = require("jsonwebtoken");
const client = require('../utils/redis')
const util = require('util');
const jwtSign = util.promisify(jwt.sign);

const shopController = {
  login: async (req, res, next) => {
    try {
      const shop = await shopService.login(req.body, next);
      const accessToken = await jwtSign(
        { shopId: shop?.shop?._id, role: shop?.shop?.role, email: shop?.shop?.email },
        process.env.ACCESSTOKEN,
        {
          expiresIn: "30s",
        }
      );
      const refreshToken = await jwtSign(
        { shopId: shop?.shop?._id, role: shop?.shop?.role, email: shop?.shop?.email },
        process.env.REFRESHTOKEN,
        {
          expiresIn: "3600h",
        }
      );
      // Lưu refreshToken vào Redis thay vì cookie
      await client.set(`refreshToken:${shop.shop?._id}`, refreshToken);
      shop.shop.accessToken = accessToken;
      return res.status(200).json({
        success: true,
        shop: shop.shop
      });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const newShop = await shopService.register(req.body, req.img, next);
      if (newShop.error) {
        return next(newShop.error);
      }
      return res.json({
        success: true,
        newShop,
      });
    } catch (error) {
      return next(error);
    }
  },
  refreshToken: async(req, res, next) => {
    try {
      const token = await shopService.refreshToken(req.body, next)
      return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  },
  logout: async (req, res, next) => {
    try {
      //xóa token jwt ra khỏi redis
      await client.del(`refreshToken:${req.shop.shopId}`)
      await client.del('shop')
      res.json({
        status: "OK",
        message: "Logged out!",
      });
    } catch (error) {
      next(error)
    }
  }
};

module.exports = shopController;
