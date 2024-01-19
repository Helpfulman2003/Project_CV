const Shop = require("../models/Shop");
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken");
const client = require('../utils/redis')
const util = require('util');
const jwtVerify = util.promisify(jwt.verify);

const shopService = {
  login: async (body, next) => {
    const { name, password } = body;
    let redisShop = await client.get("shop");
    if (redisShop) {
      const shop = JSON.parse(redisShop);
      if (shop.name !== name) {
        next(createError(400, "Incorrect shopname or password"));
      }
      const validPassword = bcrypt.compareSync(password, shop.password);
      if (!validPassword) {
        next(createError(400, "Incorrect shopname or password"));
      }
      return {
        shop,
      };
    } else {
      const shop = await Shop.findOne({ name });
      if (!shop) {
        next(createError(400, "Incorrect shopname or password"));
      } else if (!password || !shop.password) {
        next(createError(400, "Password is not defined"));
      } else {
        const validPassword = bcrypt.compareSync(password, shop.password);
        if (!validPassword) {
          next(createError(400, "Incorrect shopname or password"));
        }
      }
      await client.setEx("shop", 3600, JSON.stringify(shop));
      return {
        shop,
      };
    }
  },
  register: async (body, img, next) => {
    const checkShop = await Shop.findOne({ email: body.email });
    if (checkShop) {
      return { error: createError(403, "The email is already in use") };
    } else {
      const hash = bcrypt.hashSync(body.password, 10);
      const shop = await Shop.create({
        ...body,
        password: hash,
        avatar: {
          url: img,
        },
      });
      return {
        shop,
      };
    }
  },
  // refreshToken: async (body, next) => {
  //   try {
  //     // Lấy userId từ accessToken
  //     const shopId = body.id
  //     console.log(shopId, '123');
  //     // Lấy refreshToken từ Redis
  //     const token = await client.get(`refreshToken:${shopId}`);
  //     console.log(token);
  //     if (!token) {
  //       next(createError(404, "Refresh token not found"));
  //     }
  
  //     jwt.verify(token, process.env.REFRESHTOKEN, async (err, shop) => {
  //       if (err) {
  //         next(createError(400, "Token is invalid"));
  //       }
  //       if ('exp' in shop) {
  //         delete shop.exp;  // Nếu có, loại bỏ nó
  //       }
  //       console.log('shop', shop);
  //       const accessToken = jwt.sign(shop, process.env.ACCESSTOKEN, {
  //         expiresIn: "30s",
  //       });
  //       const refreshToken = jwt.sign(shop, process.env.REFRESHTOKEN, {
  //         expiresIn: "3600s",
  //       });
  
  //       // Lưu refreshToken vào Redis
  //       await client.setEx(`refreshToken:${shopId}`, refreshToken);
  
  //       return {
  //         accessToken
  //       }
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  refreshToken: async (body, next) => {
    try {
      const shopId = body.id;
      let token = await client.get(`refreshToken:${shopId}`);
      if (!token) {
        next(createError(404, "Refresh token not found"));
      }
      let shop = await jwtVerify(token, process.env.REFRESHTOKEN);
      if ('exp' in shop) {
        delete shop.exp;
      }
      // Cập nhật payload với thông tin mới
      shop = {
        ...shop,
        iat: Math.floor(Date.now() / 1000),  // Thời gian hiện tại dưới dạng timestamp
      };
      const accessToken = jwt.sign(shop, process.env.ACCESSTOKEN, {
        expiresIn: "60s",
      });
      const refreshToken = jwt.sign(shop, process.env.REFRESHTOKEN, {
        expiresIn: "360h",
      });
      // Lưu refreshToken mới vào Redis
      await client.set(`refreshToken:${shopId}`, refreshToken);
      // Trả về cả accessToken và refreshToken
      return {
        accessToken,
      }
    } catch (error) {
      next(error);
    }
}

};

module.exports = shopService;
