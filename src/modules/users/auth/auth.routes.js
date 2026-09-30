const express = require("express").Router()
const router = express
const verify = require("../../../utils/verify/verify")

const loginController = require("../login/login.controller")
const registerController = require("../register/register.controller")
const { recoveryCode: forgotPassController } = require("../forgotpassword/forgotPass.controller")
const resetPasswordController = require("../resetPassword/resetPassword.controller")
const refreshTokenController = require("../refresh/refresh.controller")

router.post("/login", loginController) // endpoint de login 
router.post("/register", verify, registerController) // endpoint de registro
router.post("/forgot-password", forgotPassController) // endpoint de forgotpassword
router.put("/reset-password", resetPasswordController.setPassword)

// Não usa authMiddleware porque o access token pode já estar expirado.
router.post("/refresh", refreshTokenController.refreshAccessToken)
router.post("/logout", refreshTokenController.logout)

module.exports = router
 
