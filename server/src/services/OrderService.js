const createError = require("../error");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Shop = require("../models/Shop");
const orderService = {
  createNewOrder: async (body) => {
    const newOrder = await Order.create(body);
    return {
      newOrder,
    };
  },
  getAllOrderOfShop: async (shopId, next) => {
    const orders = await Order.find();
    const orderShop = orders.map((item) => {
      const keyCart = Object.keys(item.cart);
      if (keyCart.find((key) => key === shopId)) {
        return {
          cart: item.cart[`${shopId}`],
          totalPrice: item.totalPrice,
          status: item.status,
          _id: item._id,
          createdAt: item.createdAt,
          shippingAddress: item.shippingAddress,
        };
      }
    });
    return {
      orderShop,
    };
  },
  updateOrderStatus: async (_id, status, shopId, next) => {
    const order = await Order.findById(_id);
    if (!order) {
      return next(createError(400, "Order not found with this id"));
    }
    order.status = status;
    if (status === "Transferred to delivery partner") {
      const valueObject = Object.values(order.cart).flat();
      for (const item of valueObject) {
        await Product.findByIdAndUpdate(
          { _id: item._id },
          { $inc: { stock: -item.quantity, sold_out: item.quantity } },
          { new: true }
        );
      }
    }

    if (status === "Delivered") {
      order.deliveredAt = new Date();
      order.paymentInfo.status = "Success";
      const totalPrice = (
        order?.cart[shopId].reduce((acc, item) => {
          let quantity = item.quantity ?? 0;
          return acc + quantity * item?.discountPrice;
        }, 0)).toFixed(2);
      const serviceCharge = totalPrice * 0.1;
      await Shop.findByIdAndUpdate(
        { _id: shopId },
        { $inc: { availableBalancer: totalPrice - serviceCharge }},
        { new: true }
      );
    }

    await order.save();
    return {
      success: true,
      order,
    };
  },
  getAllOrderOfUser: async (userId, next) => {
    const orders = await Order.find();
    const orderUser = orders.map((item) => {
      if (item.user._id === userId) {
        return {
          cart: Object.values(item.cart).flat(),
          _id: item._id,
          totalPrice: item.totalPrice,
          status: item.status,
          paymentInfo: item.paymentInfo,
          paidAt: item.paidAt,
          deliveredAt: item.deliveredAt,
          createdAt: item.createdAt,
          shippingAddress: item.shippingAddress,
        };
      }
    });
    return {
      orderUser,
    };
  },
};

module.exports = orderService;
