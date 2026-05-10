const registerService = require("./register.service")
const responses = require("../../../utils/apiRes")

async function register(req, res) {
    try {
        const { nome, email, senha } = req.body

        const newUser = await registerService(nome, email, senha)

        return res.status(201).json(responses.apiResponse(true, "Conta registrada com sucesso"))
    }
    catch (error) {
 
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(400).json(responses.apiResponse(
                false,
                "Email já em uso"
            ))
        } else {
            return res.status(500).json(responses.apiResponse(
                false,
                "Ocorreu um erro interno, tente novamente mais tarde",
                error.message
            ))
        }
    }
}

module.exports = register