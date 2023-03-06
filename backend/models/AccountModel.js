const mongoose = require("mongoose");
const Schema = mongoose.Schema

const accountSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required:true
    },
    cart:[{
        id:{
            type:String,
            require:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }]
},{timestamps:true})

const User = mongoose.model("User",accountSchema);
module.exports = User;