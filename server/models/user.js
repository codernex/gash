const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    order:[{}]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
    this.password= await   bcrypt.hash(this.password,10)
    }
    return next()
})


userSchema.methods.comparePass = async function (password) {
    if (password) {
    return await bcrypt.compare(password,this.password)
    } else {
        return
    }
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECURITY, {
      expiresIn: '2d'
    });
}

userSchema.methods.createOrder = async function (data) {
    this.order.push(data)
    await this.save()
}
 

const User = mongoose.model("user", userSchema)

module.exports=User