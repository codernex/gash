const Brand = require('../models/brand');	
const ErrorHandler = require('../utils/errorHandler');

exports.createBrand = async(req, res,next) => { 
    const { name } = req.body
    
    let brand = await Brand.findOne({ name: name })
    if (brand) {
        return next(new ErrorHandler(400, 'Brand already exists'))
    }

    brand = await Brand.create({...req.body, userId: req.user.id})
    
    res.status(201).json({brand})
    
}

exports.getBrands = async(req, res,next) => { 
    const brands = await Brand.find()
    res.status(200).json({brands})
}

exports.updateBrand = async(req, res,next) => { 
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!brand) {
        return next(new ErrorHandler(404, 'Brand not found'))
    }
    res.status(200).json({brand})
}

exports.deleteBrand = async(req, res,next) => { 
    const brand = await Brand.findByIdAndDelete(req.params.id)
    if (!brand) {
        return next(new ErrorHandler(404, 'Brand not found'))
    }
    res.status(200).json({brand})
}