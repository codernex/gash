const express = require('express');
const { getOrders,createOrder, deleteOrder } = require('../controller/order');
const router = express.Router();
const {verifyUser}=require("../middleware/auth")

router.route("/").get(verifyUser,getOrders).post(verifyUser,createOrder);
router.route("/:id").delete(verifyUser, deleteOrder);

module.exports=router;