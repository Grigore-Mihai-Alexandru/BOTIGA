const User = require("../models/AccountModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");
const sharp = require("sharp");
const path = require("path");
const fse = require("fs-extra");

const filePath = path.join(__dirname,"..","public","uploaded-products")

const addProduct = async(req,res)=>{
    User.findById({_id:mongoose.mongo.ObjectId(req.body.userId)})
    .then(async (r)=>{
        if(r.admin){
            if(req.file){
                const photoFilename = `${Date.now()}.jpg`;
                await sharp(req.file.buffer).resize(640,960).jpeg({quality:60}).toFile(path.join(filePath,photoFilename))
                req.cleanData.photo = photoFilename
            }
            const saveData = new Product(req.cleanData)
            saveData.save()
                .then(()=>res.send(true))
                .catch(err => {
                    console.log(err)
                    res.send(false)
                })
        }    
    })
}

const updateProduct = async(req,res)=>{
    User.findById({_id:mongoose.mongo.ObjectId(req.body.userId)})
    .then(async (r)=>{
        if(r.admin){
            if(req.file){
                const photoFilename = `${Date.now()}.jpg`;
                await sharp(req.file.buffer).resize(640,960).jpeg({quality:60}).toFile(path.join(filePath,photoFilename))
                const product = await Product.findById({_id:mongoose.mongo.ObjectId(req.body._id)})
                fse.remove(path.join(filePath,product.photo))
                req.cleanData.photo = photoFilename
            }
            Product.findByIdAndUpdate({_id:mongoose.mongo.ObjectId(req.body._id)},req.cleanData)
                .then(result=>{
                    res.send(true)
                })
                
        }else 
            res.send(false)
    })
}

const deleteProduct = async(req,res) => {
    User.findById({_id:mongoose.mongo.ObjectId(req.params.userId)})
    .then(r=>{
        if(r.admin){
            Product.findById({_id:mongoose.mongo.ObjectId(req.params.id)})
                .then(r=>{
                    if(r.photo){                            
                        fse.remove(path.join(filePath,r.photo))
                    }
                    
                    Product.findByIdAndDelete({_id:mongoose.mongo.ObjectId(req.params.id)})
                        .then((r)=>{
                            res.send(true)
                        })
                        .catch(err => {
                            console.log(err)
                            res.send(false)
                        })
                })
        }
    })
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct
}