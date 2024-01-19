const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer');

cloudinary.config({ 
  cloud_name: 'dgqyxp0vu', 
  api_key: '415327916699112', 
  api_secret: 'QJPOMHrsw6XSHuSrZD7KfMo79LY' 
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "img"
    }
  });
  
  const uploadCloud = multer({ storage });
  
  module.exports = uploadCloud;