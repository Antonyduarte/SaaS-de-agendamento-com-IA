const express = require("express")
const router = require("express").Router()
const registerController = require("./register.controller")
const verify = require("./register.verify")

router.post("/register", verify, registerController)

module.exports = router