const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    brand: {
      type: String
    },
    status: {
      type: String
    },
    uniqueCode: {
      type: String
    }
  },
  { timestamps: true }
);

productSchema.pre("save", function () {
    this.uniqueCode=Date.now()
})

const Product = mongoose.model("product", productSchema)

module.exports = Product

