const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/sendToken')


const getUsers = async (req, res) => {
    res.send("Hello From User")
}

const createUser = async (req, res,next) => {
    const { email,password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Email Or Password Invalid",404))
    }
    
    let user = await User.findOne({ email })
    
    if (user) {
        return next(new ErrorHandler("User Already Exist",404))
    }

    user = await User.create(req.body)
    
    sendToken(user,201,res)

}

const loginUser = async(req,res,next) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return next(new ErrorHandler("Email Or Password Invalid",404))
    }

    let user = await User.findOne({ email })
    
    if (!user) {
        return next(new ErrorHandler('Email Or Password Invalid', 404));
    }

    const isPasswordMatched = await user.comparePass(password)

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Email Or Password Invalid', 404));
    }

    sendToken(user,200,res)
}

const logoutUser = async (req, res, next) => { 
    
    if (req.user) {
        res.status(200).cookie('token', '', {
            expiresIn:new Date(Date.now())
        }).json({
            message: 'Logout Successfully'
        })
    } else {
        return next(new ErrorHandler('User Not Found', 404));
    }
}


module.exports = { createUser, getUsers, loginUser,logoutUser }

