const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

const getProducts = async(req,res) => {
    Product.find()
        .then((result)=>res.send(result))
        .catch(err => {
            console.log(err)
            res.send(false)
        })
}

const relatedProducts = async(req,res) => {
    //without current product
    const allProducts = await Product.find()
    const random = Math.floor(Math.random()*(allProducts.length-3))

    const products = await Product.find({_id:{$ne:req.params.id}}).skip(random).limit(3)
    res.send(products)
}

const homeProducts = async(req,res) => {
    const products = await Product.find().limit(3)
    res.send(products)
}

module.exports = {
    getProducts,
    relatedProducts,
    homeProducts
}
