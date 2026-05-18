const express = require("express").Router()
const router = express
const verify = require("../../../utils/verify")

const loginController = require("../login/login.controller")
const registerController = require("../register/register.controller")

router.post("/login", loginController)
router.post("/register", verify, registerController)

module.exports = router