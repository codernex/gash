const express = require("express")
const mongoose=require("mongoose")
const errorMiddleware = require('./middleware/error')

const cookieParser = require("cookie-parser")
const cors=require("cors")

require("dotenv").config()
//**Routes Import */
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const purchaseRoutes = require('./routes/purchase')
const brandRoutes = require('./routes/brand')
const sellRoutes = require("./routes/sell")
const orderRoutes=require("./routes/order")
//**********
const app = express()


/**Middleware for all routes */

app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/***************/

/***Routes*/
app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/purchase", purchaseRoutes)
app.use("/api/v1/sell",sellRoutes)
app.use("/api/v1/brand", brandRoutes)
app.use("/api/v1/order",orderRoutes)

/**Error Handling */
app.use(errorMiddleware);
/************/

const server = () => {
    
    mongoose.connect(process.env.DB_URI).then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Server Running at Port: ${process.env.PORT}`);
        });
    }).catch((err) => {
        process.exit(0)
    })
}


server()