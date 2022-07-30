const Order = require('../models/order');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/product');

exports.getOrders = async (req, res, next) => {
  const user = req.user;
  let order;
  if (user.role === 'user') order = await Order.find({ userId: user.id });
  else order = await Order.find();
  return res.status(200).json(order);
};
exports.createOrder = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.role === 'user'&&!user.id) {
    return next(
      new ErrorHandler('You are not authorized to perform this action', 404)
    );
  }
  const product = await Product.findOne({uniqueCode:req.body.productCode});

  if (!product) {
    return next(new ErrorHandler('Product Not found', 404));
  }

  if (product.quantity < req.body.quantity) { 
    return next(new ErrorHandler('Not enough products', 404));
  }
  if (product.quantity === 0) {
    return next(new ErrorHandler('Product is out of stock', 404));
  }

  const order = await Order.create({
    ...req.body,
    userId: user.id,
    userName: user.name,
    amount: product.price,
    productName: product.name
  });

  product.quantity - order.quantity;
  await product.save();

  let orderData = await user.createOrder(order);

  return res.status(200).json(orderData);
};

exports.deleteOrder = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.role === 'user') {
    return next(
      new ErrorHandler('You are not authorized to perform this action', 404)
    );
  }
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order Not found', 404));
  }

  if (order.userId !== user.id) {
    return next(new ErrorHandler('You are not authorized to perform this action', 404));
  }
  order= await Order.findByIdAndDelete(req.params.id);


  return res.status(200).json({ message: 'Order Cancelled' });

};


exports.updateOrder = async (req, res, next) => { 
  const user = await User.findById(req.user.id);

  if (!user.isAdmin) {
    return next(
      new ErrorHandler('You are not authorized to perform this action', 404)
    );
  }
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order Not found', 404));
  }

  const updateAbleUser = await User.findById(order.userId)
  
  const filteredOrder = updateAbleUser.order.find(data => {
    return data._id===order._id
  })

  filteredOrder.status = "Delivered"
  
  
  order = await Order.findByIdAndUpdate(req.params.id, req.body);
  
  await updateAbleUser.save()

  return res.status(200).json({ message: 'Order Delivered' });

}