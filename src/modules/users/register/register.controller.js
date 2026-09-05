const registerService = require("./register.service")
const apiRes = require("../../../utils/response/apiRes")
const { MESSAGES } = require("../../../messages/messages")

async function register(req, res) {
    try {
        const { nome, email, senha } = req.body

        const newUser = await registerService(nome, email, senha)

        return res.status(201).json(apiRes.apiResponse(true, "Conta registrada com sucesso"))
    }
    catch (error) {
 
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(400).json(apiRes.apiResponse(
                false,
                "Email já em uso"
            ))
        } else {
            return res.status(500).json(apiRes.apiResponse(
                false,
                MESSAGES.INTERNAL_ERROR_MSG
            ))
        }
    }
}

module.exports = register
