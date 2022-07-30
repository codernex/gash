const mongoose= require('mongoose');
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required:true
    },
    email: String,
    address: String,
    userId: {
      type: String,
      required:true
    }

}, {
    timestamps: true,
})


const Brand = mongoose.model('Brand', brandSchema);

module.exports=Brand;