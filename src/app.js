const express = require("express")

const app = express()

app.use(express.json())

const registerRoute = require("./modules/users/register/register.routes")
app.use("/auth", registerRoute)

module.exports = app