const express = require("express");
const router = express.Router();
const userController = require("../controllers/AccountController");
const loginCleanup = require("../middleware/loginCleanup");
const registerCleanup = require("../middleware/registerCleanup");

router.post("/authorization",userController.authorization)

router.post("/account/login",loginCleanup ,userController.userLogin)

router.post("/account/register",registerCleanup,userController.userRegister)


module.exports = router;