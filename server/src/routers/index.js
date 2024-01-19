const authRouter = require("./AuthRouter")
const eventRouter = require("./EventRouter")
const productRouter = require("./ProductRouter")
const shopRouter = require("./ShopRouter")
const couponRouter = require("./CouponRouter")
const paymentRouter = require("./Payment")
const orderRouter = require("./OrderRouter")

const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/product', productRouter)
    app.use('/api/shop', shopRouter)
    app.use('/api/event', eventRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/payment', paymentRouter)
    app.use('/api/order', orderRouter)
}

module.exports = routes
