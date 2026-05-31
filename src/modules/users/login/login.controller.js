const loginService = require("./login.service")
const apiRes = require("../../../utils/apiRes")
const ERRORS = require("../../../error/err")

async function login(req, res) {
    try {
        const { email, senha } = req.body

        if(!email || !senha) {
            return res.status(400).json(apiRes.userResponse(
                false, 
                "Email e senha são obrigatórios"
            ))
        }

        const result = await loginService(email, senha)

        return res.status(200).json(apiRes.apiResponse(
            true,
            "Seja Bem-Vindo(a) !",
            result
        ))
    } catch (error) {
        if(error.message === ERRORS.USER_NOT_FOUND) {
            return res.status(401).json(apiRes.apiResponse(
                false,
                "Usuário não encontrado"
            ))
        }
        if(error.message === ERRORS.INVALID_LOGIN) {
            return res.status(401).json(apiRes.apiResponse(
                false,
                "Login inválido" // erro atual
            ))
        } else {
            return res.status(500).json(apiRes.apiResponse(
                false,
                "Erro interno, por favor tente novamente mais tarde"
            ))
        }
    }
}

module.exports = login
 