const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    quantity:{
        type:Number,
        required:false
    },
    photo:{
        type:String,
        required:false
    }
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;