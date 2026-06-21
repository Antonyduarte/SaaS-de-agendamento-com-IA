const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:8080"
}))

// Rotas de autenticação
const authRoutes = require("./modules/users/auth/auth.routes")
app.use("/auth", authRoutes)

//Rotas de agendamentos/agenda
const agendaRoutes = require("./modules/agendamentos/agenda.routes")
app.use("/agendamento", agendaRoutes)


const notFound = require("./middlewares/notFound.middleware")
app.use(notFound)

module.exports = app