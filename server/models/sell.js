const mongoose = require("mongoose")
const sellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  uniqueCode: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
});


const Sell = mongoose.model('sell', sellSchema)

module.exports=Sell