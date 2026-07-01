const agendaRepo = require("./agenda.repository")
const errors = require("../../error/err")
const ERRORS = require("../../error/err")

// POST agenda
async function agendar(user_id, nome, data, hora) {
    
    const horarioExiste = await agendaRepo.horarioVerify(user_id, data, hora)

    if(horarioExiste) {
        throw new Error(ERRORS.TIME_CONFLICT)
    }

    const create = await agendaRepo.agendar(user_id, nome, data, hora)

    return create
}
// GET agenda completa
async function getAgenda(user_id) {
    
    let agendamentos = await agendaRepo.getAgenda(user_id)

    
    return agendamentos

}
// DELETE AGENDA by id
async function deleteAgenda(id, user_id) {

    let agendaDelete = await agendaRepo.deleteAgenda(id, user_id)

    return agendaDelete

}

// PUT - UPDATE agendamento
async function editAgenda(data, hora, id, user_id) {
    
    let edit = await agendaRepo.editAgenda(data, hora, id, user_id)

    return edit
}

module.exports = { agendar, getAgenda, deleteAgenda, editAgenda }