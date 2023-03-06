require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const fse = require("fs-extra");
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URL;
//connect to mongodb
if (!dbURI)
    throw new Error(
    'Please define the MONGO_URL environment variable inside .env.local'
    );
    
mongoose.connect(dbURI,{useNewUrlParser: true , useUnifiedTopology:true})
    .then((res)=>app.listen(port))
    .catch((err)=>console.log(err));
    
mongoose.set('strictQuery', true);


//uploaded photos for products
const imgPath = "./public/uploaded-products";
fse.ensureDirSync(imgPath);

app.use(express.static('public'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(upload.array());
app.use(upload.single("photo"));


//shop page
const ShopRoutes = require("./routes/ShopRoutes")
app.use("/api",ShopRoutes)

//user account
const AccountRoutes = require("./routes/AccountRoutes");
app.use("/api",AccountRoutes);

//products
const CartRoutes = require("./routes/CartRoutes")
app.use("/api",CartRoutes)

const AdminRoutes = require("./routes/AdminRoutes")
app.use("/api",AdminRoutes)

app.get("*", function (req,res) {
    res.status(404).send(false);
})