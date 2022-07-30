const ErrorHandler = require('../utils/errorHandler')
const jwt= require("jsonwebtoken")
const User = require('../models/user')
exports.verifyUser = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler("You don't have permission to access this route",401))
    }
    const { id } = jwt.verify(token, process.env.JWT_SECURITY);
    req.user = await User.findById(id)
    next();
}

exports.isAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(
          new ErrorHandler(
            "You don't have permission to access this route",
            401
          )
        );
       
    }
     next();
}

