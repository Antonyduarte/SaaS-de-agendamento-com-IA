const express = require("express").Router()
const router = express
const verify = require("../../../utils/verify")

const loginController = require("../login/login.controller")
const registerController = require("../register/register.controller")
const { recoveryCode: forgotPassController } = require("../forgotpassword/forgotPass.controller")

router.post("/login", loginController) // endpoint de login 
router.post("/register", verify, registerController) // endpoint de registro
router.post("/forgot-password", forgotPassController) // endpoint de forgotpassword


module.exports = router
