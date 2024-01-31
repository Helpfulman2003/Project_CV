const authService = require("../services/AuthService");
const jwt = require("jsonwebtoken");
const client = require("../utils/redis");
const authController = {
  login: async (req, res, next) => {
    try {
      const user = await authService.login(req.body, next);
      const accessToken = jwt.sign(
        { userId: user.user?._id, role: user.user.role, email: user.user.email },
        process.env.ACCESSTOKEN,
        {
          expiresIn: "30s",
        }
      );

      const refreshToken = jwt.sign(
        { userId: user.user._id, role: user.user.role, email: user.user.email },
        process.env.REFRESHTOKEN,
        {
          expiresIn: "3600h",
        }
      );
      // Lưu refreshToken vào Redis thay vì cookie
      await client.set(`refreshToken:${user.user._id}`, refreshToken);
      user.user.accessToken = accessToken;
      return res.status(200).json({
        success: true,
        user: user.user,
      });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const newUser = await authService.register(req.body, req.img, next);
      return res.json({
        success: true,
        newUser,
      });
    } catch (error) {
      return next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const token = await authService.refreshToken(req.body, next);
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      //xóa token jwt ra khỏi redis
      await client.del(`refreshToken:${req.user.userId}`, 'user')
      res.json({
        status: "OK",
        message: "Logged out!",
      });
    } catch (error) {
      next(error)
    }
  },
  updateUser: async(req, res, next) => {
    try {
      const userUpdate = await authService.updateUser(req.body, req.user.userId, req.img, next)
      return res.json({success: true, message: 'Update success', userUpdate})
    } catch (error) {
      next(error)
    }
  }
};

module.exports = authController;
