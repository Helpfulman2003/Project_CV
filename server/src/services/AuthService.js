const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken");
const client = require("../utils/redis");
const util = require("util");
const jwtVerify = util.promisify(jwt.verify);
const jwtSign = util.promisify(jwt.sign);

const authService = {
  login: async (body, next) => {
    const { name, password } = body;
    let redisUser = await client.get("user");
    if (redisUser?.name !== undefined) {
      const user = JSON.parse(redisUser);
      if (user.name !== name) {
        next(createError(400, "Incorrect username or password"));
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        next(createError(400, "Incorrect username or password"));
      }
      return {
        user,
      };
    } else {
      const user = await User.findOne({ name });
      if (!user) {
        next(createError(400, "Incorrect username or password"));
      } else if (!password || !user.password) {
        next(createError(400, "Password is not defined"));
      } else {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          next(createError(400, "Incorrect username or password"));
        }
      }
      await client.setEx("user", 3600, JSON.stringify(user));
      return {
        user,
      };
    }
  },
  register: async (body, img, next) => {
    const checkUser = await User.findOne({ email: body.email });
    if (checkUser) {
      return next(createError(403, "The email is already in use"));
    } else {
      const hash = bcrypt.hashSync(body.password, 10);
      const user = await User.create({
        ...body,
        password: hash,
        avatar: {
          url: img,
        },
      });
      return {
        user,
      };
    }
  },
  refreshToken: async (body, next) => {
    try {
      const userId = body.id;
      let token = await client.get(`refreshToken:${userId}`);
      if (!token) {
        next(createError(404, "Refresh token not found"));
      }
      let user = await jwtVerify(token, process.env.REFRESHTOKEN);
      if ("exp" in user) {
        delete user.exp;
      }
      user = {
        ...user,
        iat: Math.floor(Date.now() / 1000), 
      };
      const accessToken = await jwtSign(user, process.env.ACCESSTOKEN, {
        expiresIn: "60s",
      });
      const refreshToken = await jwtSign(user, process.env.REFRESHTOKEN, {
        expiresIn: "3600h",
      });
      // Lưu refreshToken mới vào Redis
      await client.set(`refreshToken:${userId}`, refreshToken);
      return {
        accessToken,
        refreshToken
      };
    } catch (error) {
      next(error);
    }
  },
  updateUser: async(body, userId, img, next) => {
    const user = await User.findById({_id: userId})
    if(!user) {
      next(createError(404, 'User id is invalid'))
    }
    user.name = body.name
    user.email = body.email
    user.phone = body.phone
    user.address = {
      city: body.city,
      address: body.address,
      zipCode: body.zipCode
    }
    user.avatar = {
      url: img,
    }
    await user.save()
    return {
      user
    }
  }
};

module.exports = authService;
