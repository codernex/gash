const Product= require("../models/product")
const ErrorHandler = require('../utils/errorHandler')

exports.getProduct = async (req, res) => {
    const products = await Product.find()
    return res.status(200).json(products)
 }

exports.addProduct = async (req, res) => {
    const product = await Product.create(req.body)
    return res.status(201).json(product)
 }

exports.updateProduct = async (req, res, next) => {
    const {id}=req.params
    try {
        let product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json({
          message: 'Product Updated',
          product
        });
    } catch (err) {
        return next(new ErrorHandler(err,400))
    }
};
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
      let product = await Product.findByIdAndDelete(id);
      return res.status(200).json({
        message: 'Product Updated',
        product
      });
    } catch (err) {
      return next(new ErrorHandler(err, 400));
    }
};