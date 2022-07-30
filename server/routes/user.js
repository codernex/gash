const express = require("express")
const { getUsers, createUser, loginUser, logoutUser } = require('../controller/user')
const { verifyUser } = require('../middleware/auth')

const userRouter = express.Router()


userRouter.route("/").get(getUsers).post(createUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", verifyUser,logoutUser)



module.exports=userRouter