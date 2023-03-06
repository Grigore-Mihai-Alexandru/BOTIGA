const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");
const multer = require("multer");
const path = require("path");
const upload = multer();
const {cleanup} = require("../middleware/productCleanup");


router.put("/add-product", cleanup, adminController.addProduct)

router.post("/update-product", cleanup, adminController.updateProduct)

router.delete("/delete-product/:id/:userId", adminController.deleteProduct)

module.exports = router