const createError = require("../error");
const Shop = require("../models/Shop");
const Event = require("../models/Event");
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')

const eventService = {
  create: async (shopId, body, img, next) => {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      next(createError(404, "Shop Id is invalid!"));
    }
    // body = Object.assign({}, body);
    // if (Object.keys(body).length === 0) {
    //   return next(createError(400, "Body must not be empty!"));
    // }
    const event = await Event.create({ ...body, shopId: shopId, images: { url: img } }, {new: true});
    return {
        event
    }
  },
  getAllEventOfShop: async(shopId, next) => {
    const events = await Event.find({shopId: {$eq: shopId}})
    return {
      events
    }
  },
  deleteEventOfShop: async(id, next) => {
    const objectId = new mongoose.Types.ObjectId(id)
    const event = await Event.findById({_id: objectId})
    if(!event) {
      next(createError(404, 'Event is not found with this id'))
    }
    for(let i = 0; i < event.images.url; i++) {
      const result = await cloudinary.uploader.destroy(event.images.url[i]?.publicId)
    }
    await Event.deleteOne({_id: objectId})
    return {
      success: true,
      message: "Event deleted successfully!",
    }
  },
  getAllEvent: async() => {
    const events = await Event.find().sort({createdAt: -1}).populate('shopId')
    return {
      events
    }
  }
};

module.exports = eventService