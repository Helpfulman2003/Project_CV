const createError = require("../error");
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const productService = {
  create: async (shopId, body, img, next) => {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      next(createError(404, "Shop Id is invalid!"));
    }
    // body = Object.assign({}, body);
    // if (Object.keys(body).length === 0) {
    //   return next(createError(400, "Body must not be empty!"));
    // }
    const product = await Product.create(
      { ...body, shopId: shopId, images: { url: img } },
      { new: true }
    );
    return {
      product,
    };
  },
  getAllProductOfShop: async (shopId, next) => {
    const products = await Product.find({ shopId: { $eq: shopId } });
    return {
      products,
    };
  },
  deleteProductOfShop: async (id, next) => {
    const objectId = new mongoose.Types.ObjectId(id);
    const product = await Product.findById({ _id: objectId });
    if (!product) {
      next(createError(404, "Product is not found with this id"));
    }
    for (let i = 0; i < product.images.url; i++) {
      const result = await cloudinary.uploader.destroy(
        product.images.url[i]?.publicId
      );
    }
    await product.deleteOne({ _id: objectId });
    return {
      success: true,
      message: "Product Deleted successfully!",
    };
  },
  getAllProduct: async () => {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("shopId")
      .populate({
        path: "reviews",
        populate: {path: 'userId'}
      })
    return {
      products,
    };
  },
  productReview: async (body, userId, next) => {
    const { rating, comment, productId } = body;
    const product = await Product.findById({ _id: productId });
    const isReview = product.reviews?.find((review) => review.userId.toString() === userId);
    if (isReview) {
      product.reviews = product.reviews.map((review) => {
        if (review.userId.toString() === userId) {
          return { ...review, rating, comment };
        }
        return review;
      });
    } else {
      product.reviews.push({ userId, rating, comment });
    }
    let avg = 0;
    product.reviews.forEach((review) => (avg += review.rating));
    product.ratings = (avg / product.reviews.length).toFixed(1);
    await product.save();
    return {
      success: true,
      message: "Review successfully!",
    };
  }
,
};

module.exports = productService;
