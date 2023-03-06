const jwt = require("jsonwebtoken"); 
const User = require("../models/AccountModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");
const secretKey = process.env.SECRET_ACCES_TOKEN;

async function cartProducts(req,res){
    jwt.verify(req.body.cookie,secretKey,(err,decoded) => {
        if(err)
            res.send(false)
        User.findOne({_id:mongoose.mongo.ObjectId(decoded._id)})
            .then(result => {
                if(result.cart.length>0)
                    res.send(result.cart)
                else res.send(false)
            })
            .catch(err => {
                console.log(err)
                res.send(false)
            })
    })
}

async function addToCart(req,res){
    User.findOne({_id:req.body.userId})
        .then(user => {
            //check if there is already a product in cart
            const productPosition = user.cart.findIndex((e) => e.id === req.body.productId)
            if(user.cart.length>0 && productPosition !==-1){
                user.cart[productPosition].quantity += parseInt(req.body.quantity);
                
                User.findByIdAndUpdate({_id:req.body.userId},{cart:user.cart})
                    .then( () => res.send(true))
                    .catch(err => {
                        console.log(err)
                        res.send(false)
                    })
            }
            else{
                user.cart.push({
                    id: req.body.productId,
                    quantity: req.body.quantity 
                })
                
                User.findByIdAndUpdate({_id:req.body.userId},{cart:user.cart})
                    .then( () => res.send(true))
                    .catch(err => {
                        console.log(err)
                        res.send(false)
                    })
                }
        })
}

async function findProduct(req,res){
    Product.findById({_id:mongoose.mongo.ObjectId(req.body.id)})
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
            res.send(false)
        })
}

async function updateCart(req,res){
    User.findById({_id:mongoose.mongo.ObjectId(req.body.userId)})
        .then(r => {
            req.body.itemsObj.map(product => {
                r.cart.map(cart => {
                    if(cart.id === product.id){
                        return cart.quantity = product.quantity 
                    }
                })
            })
            //check if there is an product with quantity=0 and delete it
            let i = 0
            r.cart.map(cart => {
                if(cart.quantity === 0){
                    r.cart.splice(i,1);
                }
                i++
            })

            User.findByIdAndUpdate({_id:mongoose.mongo.ObjectId(req.body.userId)},{cart:r.cart})
                .then(() => res.send(true))
                .catch(err => {
                    console.log(err)
                    res.send(false)   
                })
        })
        .catch(err => {
            console.log(err)
            res.send(false)   
        })
}

async function removeProduct (req,res){
    const userId = req.params.userId
    const productId = req.params.productId
    User.findById({_id:mongoose.mongo.ObjectId(userId)})
        .then(r => {
            const updatedCart =r.cart.filter(product => product.id !== productId)
            
            User.findByIdAndUpdate({_id:mongoose.mongo.ObjectId(userId)},{cart:updatedCart})
                .then(() => res.send(true))
                .catch(err => {
                    console.log(err)
                    res.send(false)   
                })
        })
        .catch(err=>{
            console.log(err)
            res.send(false)   
        })
}

module.exports = {
    cartProducts,
    addToCart,
    findProduct,
    updateCart,
    removeProduct
}