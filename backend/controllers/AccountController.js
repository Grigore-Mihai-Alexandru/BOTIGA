const jwt = require("jsonwebtoken"); 
const User = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const secretKey = process.env.SECRET_ACCES_TOKEN;


async function authorization(req,res){
    jwt.verify(req.body.cookie,secretKey,(err,decoded)=>{
        if(err)
            console.log(err)
        //sending user data without cart to front
        if(decoded.admin === true){
            res.send(decoded)
        }
        else if(decoded.admin === false)
            res.send(decoded)
        else res.send(false)
    });
}


async function userLogin(req,res){
    User.findOne({
        $or:[{name:req.cleanData.name},{email:req.cleanData.name}],
    })
    .then((result) =>{
        const response = bcrypt.compare(req.cleanData.password,result.password,(err,r)=>{
            if(!err){
                if(r){
                    const token = jwt.sign({_id:result._id.toString(),name:result.name, email:result.email, password:result.password,admin:result.admin},secretKey)
                    res.send(token)
                }else res.send(false)
            }else res.send(false)
        })   
    })
    .catch((err) => {
        console.log(err)
        res.send(false);
    })
}

async function userRegister(req,res){
    let register;
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(req.cleanData.password,salt)

    User.findOne({$and:[{email:req.cleanData.email}]})
        .then(result => register = result)
        .catch(err => {
            console.log(err)
            res.send(false)
        })
    if(register == null){
        const user = new User({
            name:req.cleanData.name,
            password:hashPassword,
            email:req.cleanData.email,
            admin:false,
            cart:[]
        })
        user.save()
            .then(() => res.send(true))
            .catch(err => {
                console.log(err)
                res.send(false)
            })
    }else{
        res.send(false)
    }
}
module.exports = {
    userLogin,
    userRegister,
    authorization
}