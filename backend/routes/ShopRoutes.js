const express = require("express");
const router = express.Router();
const shopController = require("../controllers/ShopController");

router.get("/shop/products", shopController.getProducts)

router.get("/shop/related-products/:id",shopController.relatedProducts)

router.get("/home-products", shopController.homeProducts)
    
module.exports = router;