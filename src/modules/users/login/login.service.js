require("dotenv").config()
const loginRepo = require("./login.repository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { MESSAGES } = require("../../../messages/messages")

async function userLogin(email, senha) {

    const user = await loginRepo.findByEmail(email)

    if (!user) {
        throw new Error(MESSAGES.USER_NOT_FOUND)
    }


    const passVerify = await bcrypt.compare(senha, user.password) // compara a senha enviada com a senha criptografada no banco

    if (!passVerify) {
        throw new Error(MESSAGES.INVALID_LOGIN)
    }

    const token = jwt.sign({
        id: user.id,
        name: user.nome,
        email: user.email,
        role: user.role
    }, process.env.SECRET_KEY, { expiresIn: "7d" })

    return token
}

module.exports = userLogin
