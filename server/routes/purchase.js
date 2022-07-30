const express = require("express")
const { createPurchase, getPurchase, updatePurchase, deletePurchase } = require('../controller/purchase')
const { verifyUser, isAdmin } = require('../middleware/auth')

const purchaseRoutes = express.Router()

purchaseRoutes.route("/").post(verifyUser, isAdmin, createPurchase).get(getPurchase)
purchaseRoutes
  .route('/:id')
  .patch(verifyUser, isAdmin, updatePurchase)
  .delete(verifyUser, isAdmin,deletePurchase);

module.exports=purchaseRoutes