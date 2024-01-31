const authController = require("../controllers/AuthController")
const uploadCloud = require('../middleware/uploader')
const uploadImages = require('../controllers/UploadImage')
const middleware = require("../middleware/middleware")

const authRouter = require("express").Router()

authRouter.post('/login', authController.login)
authRouter.get('/logout', middleware.verifyToken, authController.logout)
authRouter.post('/refresh-token', authController.refreshToken)
authRouter.post('/register', uploadCloud.array('files', 10), uploadImages ,authController.register)
authRouter.put('/update', middleware.verifyToken, uploadCloud.array('files', 10), uploadImages ,authController.updateUser)

module.exports = authRouter
