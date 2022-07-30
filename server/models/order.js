const mongoose = require('mongoose');

const orderSchma = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  productCode: {
    type: String,
    required: true
  }
  ,
  productName: {
    type: String,
    required: true
  },
  productSupplier: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required:true
  }
  ,
  userContact: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required:true
  },
  status: {
    type: String,
    default:"pending"
  }
})


const Order = mongoose.model('Order', orderSchma);

module.exports = Order;