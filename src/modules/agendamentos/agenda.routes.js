const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/auth.middleware")
const adminMiddleware = require("../../middlewares/admin.middleware")

const agendaController = require("./agenda.controller")

// Rota pública: mostra somente os horários que podem ser reservados.
router.get("/disponiveis", agendaController.getHorariosDisponiveis)

// -- ROTAS DE AGENDAMENTO --
router.post("/", authMiddleware, agendaController.agendar) // POST DE AGENDAMENTO
router.get("/", authMiddleware, agendaController.getAgenda) //GET AGENDA (AGENDA DO PROPRIO USUARIO)
router.delete("/:id", authMiddleware, agendaController.deleteAgenda) //DELETE AGENDAMENTO
router.put("/", authMiddleware, agendaController.editAgenda) //PUT EDITAR AGENDAMENTO JÁ FEITO

// Apenas administradores podem visualizar todos os agendamentos.
router.get("/admin", authMiddleware, adminMiddleware, agendaController.getAllAgenda)
router.delete("/admin/delete/:id", authMiddleware, adminMiddleware, agendaController.admDeleteAgenda)

module.exports = router
