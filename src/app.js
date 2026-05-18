const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:8080"
}))


const authRoutes = require("./modules/users/auth/auth.routes")
app.use("/auth", authRoutes)
app.use("/auth", authRoutes)

module.exports = app