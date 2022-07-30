const Purchase = require('../models/purchase');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

exports.createPurchase = async (req, res, next) => {
  const { name} = req.body;

  try {
    let product, purchase;
    
      product = await Product.findOne({name});
      if (!product) {
        
          return next(new ErrorHandler("No Product Found Maybe Add Some", 400));
    }
    

    purchase = await Purchase.create(req.body);

    product.quantity += purchase.quantity;
      product.price = purchase.sellingPrice;
      product.brand=purchase.supplier
    await product.save();

    return res.status(201).json(purchase);
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};


exports.getPurchase = async (req, res) => {
    let purchase = await Purchase.find()
    return res.status(200).json(purchase)
}


exports.updatePurchase = async (req, res, next) => {
    const { id } = req.params
    

    let purchase = await Purchase.findById(id)
  
    if (!purchase) {
        return next(new ErrorHandler("No Previous Purchase Found To Update",400))
    }

    let product = await Product.findOne({ name: purchase.name })
     if (!product) {
       return next(
         new ErrorHandler('No Product Found', 400)
       );
    }
    purchase = await Purchase.findByIdAndUpdate(id, req.body, { new: true })
    
    product.quantity = purchase.quantity
    product.price = purchase.sellingPrice
    
    await product.save()

    return res.status(200).json({message:"Purchase Updated",purchase})
    
}

exports.deletePurchase = async (req, res, next) => {
    const { id } = req.params
    let purchase = await Purchase.findById(id);

    if (!purchase) {
      return next(
        new ErrorHandler('No Previous Purchase Found To Update', 400)
      );
    }
    let product = await Product.findOne({ name: purchase.name });
    if (product.quantity>0) {
      return next(new ErrorHandler(`Purchase Can't be deleted, You have stock with this product`, 400));
    }
    purchase = await Purchase.findByIdAndDelete(id)
    
    return res.status(200).json({message:"Purchase Deleted"})
}