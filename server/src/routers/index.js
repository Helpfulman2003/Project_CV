const authRouter = require("./AuthRouter")
const eventRouter = require("./EventRouter")
const productRouter = require("./ProductRouter")
const shopRouter = require("./ShopRouter")
const couponRouter = require("./CouponRouter")
const paymentRouter = require("./Payment")
const orderRouter = require("./OrderRouter")
const messageRouter = require("./MessageRouter")
const router = require("express").Router()
const stripe = require('stripe')('sk_test_51OXztXCqeTGxAfHzA7wgm3BqK7JHaTYEej3qYOpop7OFoc7ZxlAHmfnE3YtQXYAnPFv62QfbPU2YM8Q5hIiJP2KK00TroV3GfL');

const routes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/product', productRouter)
    app.use('/api/shop', shopRouter)
    app.use('/api/event', eventRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/payment', paymentRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/message', messageRouter)
    app.use('/api/pay', paymentRouter)
    // app.use('/payment', router.post('/', async(req, res, next) => {
    //     const {amount, id} = req.body
    //     try {
    //       const payment = await stripe.paymentIntents.create({
    //         amount: amount*100/100,
    //         currency: "USD",
    //         description: 'product',
    //         payment_method: id,
    //         confirm: true,
    //         return_url: 'http://your-return-url.com' // Add your return URL here
    //       })
    //       console.log(payment);
    //       res.json({
    //         message: "Payment successful",
    //         success: true
    //       })
    //     } catch (error) {
    //       next(error)
    //     }
    //   }))
      
}

module.exports = routes
