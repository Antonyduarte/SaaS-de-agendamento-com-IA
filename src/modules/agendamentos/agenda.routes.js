const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/auth.middleware")
const adminMiddleware = require("../../middlewares/admin.middleware")

const agendaController = require("./agenda.controller")

// Rota pública: mostra somente os horários que podem ser reservados.
router.get("/disponiveis", agendaController.getHorariosDisponiveis)

// Apenas administradores podem visualizar todos os agendamentos.
router.get("/admin", authMiddleware, adminMiddleware, agendaController.getAllAgenda)

//POST agendamento
router.post("/", authMiddleware, agendaController.agendar)

//GET agendamentos by user_id
router.get("/", authMiddleware, agendaController.getAgenda)

//DELETE agendamento by id, user_id
router.delete("/:id", authMiddleware, agendaController.deleteAgenda)

//PUT agendamento
router.put("/", authMiddleware, agendaController.editAgenda)

module.exports = router
