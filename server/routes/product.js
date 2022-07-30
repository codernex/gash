const express = require("express")
const { getProduct, addProduct,deleteProduct,updateProduct } = require('../controller/product')
const { verifyUser, isAdmin } = require('../middleware/auth')

const productRouter = express.Router()


productRouter.route("/").get(getProduct).post(verifyUser,isAdmin,addProduct)

productRouter
  .route('/:id')
  .patch(verifyUser, isAdmin, updateProduct)
  .delete(verifyUser, isAdmin, deleteProduct);

module.exports=productRouter