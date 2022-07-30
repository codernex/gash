const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    supplier: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    purchasePrice: {
      type: String,
      required: true
    },
    sellingPrice: {
      type: String,
      required: true
    },
    totalPrice: {
      type: String
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
    
purchaseSchema.pre('save', function () {
  this.totalPrice = this.quantity * parseInt(this.purchasePrice);
});

const Purchase = mongoose.model("purchase", purchaseSchema)
    

module.exports=Purchase