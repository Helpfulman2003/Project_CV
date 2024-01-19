const jwt = require('jsonwebtoken');
const createError = require('../error');
const util = require('util');
const jwtVerify = util.promisify(jwt.verify)

const middleware = {
    //verify token
    verifyToken: async(req, res, next) => {
        const token = req.headers.token;
        if(token) {
            //Bearer abadjskda
            const accessToken = token.split(" ")[1]
            try {
                const user = await jwtVerify(accessToken, process.env.ACCESSTOKEN)
                req.user = user
                next()
            } catch (error) {
                next(createError(403, 'Token is not valid'))
            }
        }else {
            next(createError(401, 'You are not authenticated'))
        }
    },
    verifyTokenSeller: async(req, res, next) => {
        const token = req.headers.token;
        if(token) {
            //Bearer abadjskda
            const accessToken = token.split(" ")[1]
            try {
                const shop = await jwtVerify(accessToken, process.env.ACCESSTOKEN)
                req.shop = shop
                if(req.shop.role === 'seller') {
                    next()
                }else {
                    next(createError(403, 'You aren`t allowed to access'))
                }
            } catch (error) {
                next(createError(403, 'Token is not valid'))
            }
        }else {
            next(createError(401, 'You are not authenticated'))
        }
    }
        
}

module.exports = middleware
