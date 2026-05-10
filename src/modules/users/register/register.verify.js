const responses = require("../../../utils/apiRes")

function verify(req, res, next) {
    const { nome, email, senha } = req.body
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    //nome
    if(!nome || nome.trim() === "") {
        return res.status(400).json(responses.apiResponse(
            false, 
            "Preencha o campo 'Nome'"
        ))
    }
    if(!nomeRegex.test(nome) || typeof nome !== "string") {
        return res.status(400).json(responses.apiResponse(
            false,
            "O nome deve conter apenas letras, acentos e espaços"
        ))
    }
    //Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!email || email.trim() === "") {
        return res.status(400).json(responses.apiResponse(
            false, 
            "Preencha o campo 'Email'"
        ))
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json(responses.apiResponse(
            false,
            "Email inválido"
        ))
    }

    // ----------------------------------------------------------------
    // Senha
    if(!senha || senha.trim() === "") {
        return res.status(400).json(responses.apiResponse(
            false,
            "Preencha o campo 'Senha'"
        ))
    }
    next()
}

module.exports = verify