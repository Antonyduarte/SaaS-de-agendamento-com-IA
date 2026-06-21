const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/auth.middleware")

const agendaController = require("./agenda.controller")
//POST agendamento
router.post("/", authMiddleware, agendaController.agendar)

//GET agendamentos by user_id
router.get("/", authMiddleware, agendaController.getAgenda)

//DELETE agendamento by id, user_id
router.delete("/:id", authMiddleware, agendaController.deleteAgenda)

module.exports = router
