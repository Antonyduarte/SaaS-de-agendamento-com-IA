const loginService = require("./login.service")
const apiRes = require("../../../utils/apiRes")

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
        if(error.message === "USER_NOT_FOUND") {
            return res.status(401).json(apiRes.apiResponse(
                false,
                "Login inválido"
            ))
        } else {
            return res.status(500).json(apiRes.apiResponse(
                false,
                error.cause
            ))
        }
    }
}

module.exports = login
 