const client = require('../utils/redis')
const productServices = require('../services/ProductService')
const productController = {
    create: async(req, res, next) => {
        try {
            const shopId = req.shop.shopId
            const product = await productServices.create(shopId, req.body, req.img, next)
            return res.status(200).json({
                success: true,
                message: 'Add product successfully',
                product
            })
        } catch (error) {
            next(error)
        }
    },
    getAllProductOfShop: async(req, res, next) => {
        try {
            const products = await productServices.getAllProductOfShop(req.shop.shopId, next)
            return res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    },
    deleteProductOfShop: async(req, res, next) => {
        try {
            const product = await productServices.deleteProductOfShop(req.params.id, next)
            return res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    },
    getAllProduct: async(req, res, next) => {
        try {
            const products = await productServices.getAllProduct()
            res.status(200).json({
                success: true,
                message: 'All product',
                products
            })
        } catch (error) {
            next(error)
        }
    },
    productReview: async(req, res, next) => {
        try {
            //productId có trong truyền trong body
            const newReview = await productServices.productReview(req.body, req.user.userId, next)
            return res.status(200).json(newReview)
        } catch (error) {
            next(error)
        }
    }
};

module.exports = productController;
