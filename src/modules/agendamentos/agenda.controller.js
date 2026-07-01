const apiRes = require("../../utils/apiRes")
const agendaService = require("./agenda.service")
const ERRORS = require("../../error/err")
//


async function agendar(req, res) {
    const { nome, data, hora } = req.body
    if (!nome || !data || !hora) {
        return res.status(400).json(apiRes.apiResponse(
            false,
            "Preencha todos os campos"
        ))
    }
    const user_id = req.user.id

    // console.log("REQ USER: ", req.user)

    try {
        let create = await agendaService.agendar(user_id, nome, data, hora)

        return res.status(201).json(apiRes.apiResponse(
            true,
            "Horário agendado com sucesso"
        ))
    } catch (error) {
        console.error(error);

        if (error.message === ERRORS.TIME_CONFLICT) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                "Horário já agendado por outro usuário"
            ))
        } else {
            return res.status(500).json(apiRes.apiResponse(
                false,
                "Erro interno, tente novamente mais tarde"
            ))
        }
    }
}

// GET Agendamentos

async function getAgenda(req, res) {

    try {
        const user_id = req.user.id

        const agenda = await agendaService.getAgenda(user_id)

        if(agenda.length === 0) {
            return res.status(200).json(apiRes.apiResponse(
                true,
                "Nenhum registro encontrado"
            ))
        }

        return res.status(200).json(agenda)
    } catch (error) {
        return res.status(500).json(apiRes.apiResponse(
            false,
            "Ocorreu um erro interno, por favor tente novamente mais tarde"
        ))
    }

}
// DELETE agenda
async function deleteAgenda(req, res) {
    try {
        const user_id = req.user.id
        const { id } = req.params

        const result = await agendaService.deleteAgenda(id, user_id)

        if(result.affectedRows === 0) {
            return res.status(404).json(apiRes.apiResponse(
                false,
                "Nenhum registro encontrado",
                null
            ))
        }
        return res.status(200).json(apiRes.apiResponse(
            true,
            "Agendamento deletado com sucesso",
            null
        ))
    } catch (error) {
        return res.status(500).json(
            apiRes.apiResponse(
                false,
                "Ocorreu um erro interno, tente novamente mais tarde",
                console.error(error)
            )
        )
    }
}
// EDIT AGENDA - PUT
async function editAgenda(req, res) {
    try {

        const user_id = req.user.id
        const { id, data, hora } = req.body
        
        const result = await agendaService.editAgenda(data, hora, id, user_id)

        if (result.affectedRows <= 0) {
            return res.status(404).json(apiRes.apiResponse(
                false,
                "Agendamento não encontrado",
                null
            ))
        } return res.status(200).json(apiRes.apiResponse(
            true,
            "Horário alterado com sucesso"
        ))

    } catch (error) {
        return res.status(500).json(apiRes.apiResponse(
            false,
            error.message
        ))
    }
}

module.exports = { agendar, getAgenda, deleteAgenda, editAgenda }