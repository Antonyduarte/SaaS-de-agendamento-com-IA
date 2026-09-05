const apiRes = require("../../utils/response/apiRes")
const agendaService = require("./agenda.service")
const { MESSAGES } = require("../../messages/messages")
const { HORA_REGEX, DATA_REGEX } = require("../../utils/regex/regex")

async function agendar(req, res) {
    const { nome, data, hora } = req.body

    const horaValida = HORA_REGEX.test(hora)
    const dataValida = DATA_REGEX.test(data)

    if (!nome || !data || !hora) {
        return res.status(400).json(apiRes.apiResponse(
            false,
            MESSAGES.EMPTY_DATA_MSG // Certifique-se de preencher todos os campos
        ))
    }
    if (!dataValida) {
        return res.status(400).json(apiRes.apiResponse(
            false,
            MESSAGES.INVALID_DATA // Data inválida
        ))
    }
    if (!horaValida) {
        return res.status(400).json(apiRes.apiResponse(
            false,
            MESSAGES.INVALID_TIME // Horário inválido
        ))
    }

    const user_id = req.user.id

    try {
        let create = await agendaService.agendar(user_id, nome, data, hora)

        return res.status(201).json(apiRes.apiResponse(
            true,
            "Horário agendado com sucesso"
        ))
    } catch (error) {
        console.error(error);

        if (error.message === MESSAGES.TIME_CONFLICT) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                "Horário indisponível: mantenha pelo menos 35 minutos entre agendamentos"
            ))
        } else {
            return res.status(500).json(apiRes.apiResponse(
                false,
                MESSAGES.INTERNAL_ERROR_MSG
            ))
        }
    }
}

async function getHorariosDisponiveis(req, res) {
    const { data } = req.query

    if (!data || !DATA_REGEX.test(data)) {
        return res.status(400).json(apiRes.apiResponse(
            false,
            MESSAGES.INVALID_DATA
        ))
    }

    try {
        const horarios = await agendaService.getHorariosDisponiveis(data)

        return res.status(200).json(apiRes.apiResponse(
            true,
            "Horários disponíveis",
            horarios
        ))
    } catch (error) {
        console.error(error)
        return res.status(500).json(apiRes.apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR_MSG
        ))
    }
}

// GET Agendamentos

async function getAgenda(req, res) {

    try {
        const user_id = req.user.id

        const agenda = await agendaService.getAgenda(user_id)

        if (agenda.length === 0) {
            return res.status(200).json(apiRes.apiResponse(
                true,
                "Nenhum registro encontrado"
            ))
        }

        return res.status(200).json(agenda)
    } catch (error) {
        return res.status(500).json(apiRes.apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR_MSG
        ))
    }

}

async function getAllAgenda(req, res) {
    try {
        const agenda = await agendaService.getAllAgenda()
        return res.status(200).json(agenda)
    } catch (error) {
        return res.status(500).json(apiRes.apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR_MSG
        ))
    }
}
// DELETE agenda
async function deleteAgenda(req, res) {
    try {
        const user_id = req.user.id
        const { id } = req.params

        const result = await agendaService.deleteAgenda(id, user_id)

        if (result.affectedRows === 0) {
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
                MESSAGES.INTERNAL_ERROR_MSG
            )
        )
    }
}
// EDIT AGENDA - PUT
async function editAgenda(req, res) {
    try {

        const user_id = req.user.id
        const { id, data, hora } = req.body

        if (!id || !data || !hora) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                MESSAGES.EMPTY_DATA_MSG
            ))
        }

        if (!DATA_REGEX.test(data)) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                MESSAGES.INVALID_DATA
            ))
        }

        if (!HORA_REGEX.test(hora)) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                MESSAGES.INVALID_TIME
            ))
        }

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
        if (error.message === MESSAGES.TIME_CONFLICT) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                "Horário indisponível: mantenha pelo menos 35 minutos entre agendamentos"
            ))
        }

        return res.status(500).json(apiRes.apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR_MSG
        ))
    }
}

// -- ADMIN endpoints --

async function admDeleteAgenda(req, res) {

    try {
        const { id }  = req.params
        if (id.length === 0) {
            return res.status(400).json(apiRes.apiResponse(
                false,
                MESSAGES.EMPTY_DATA_MSG
            ))
        }

        await agendaService.admDeleteAgenda(id)
        return res.status(200).json(apiRes.apiResponse(
            true,
            MESSAGES.DELETED_DATA
        ))

    } catch (error) {
        return res.status(500).json(apiRes.apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR
        ))
    }

}


module.exports = {
    agendar,
    getHorariosDisponiveis,
    getAgenda,
    getAllAgenda,
    deleteAgenda,
    editAgenda,
    admDeleteAgenda
}
