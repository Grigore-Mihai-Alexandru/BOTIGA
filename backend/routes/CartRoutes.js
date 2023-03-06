const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController")

router.post("/cart",cartController.cartProducts)

router.post("/add-to-cart",cartController.addToCart)

router.post("/find-product",cartController.findProduct)

router.put("/update-cart",cartController.updateCart)

router.delete("/remove-product/:userId/:productId",cartController.removeProduct)

module.exports = router