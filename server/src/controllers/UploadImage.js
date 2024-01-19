const cloudinary = require('cloudinary').v2

const  uploadImages = async(req, res, next) => {
    try {
        const images = req.files?.map((file) => file.path)
        const uploadImages = []

        for(let image of images) {
            const results = await cloudinary.uploader.upload(image)
            uploadImages.push({
                url: results.secure_url,
                publicId: results.public_id,
            })
        }
        req.img = uploadImages
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = uploadImages