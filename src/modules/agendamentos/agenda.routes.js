const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/auth.middleware")

const agendaController = require("./agenda.controller")
//POST agendamento
router.post("/", authMiddleware, agendaController.agendar)

//GET agendamentos by user_id
router.get("/", authMiddleware, agendaController.getAgenda)

module.exports = router
