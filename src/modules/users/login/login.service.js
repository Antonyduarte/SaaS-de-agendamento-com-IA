require("dotenv").config()
const loginRepo = require("./login.repository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ERRORS = require("../../../error/err")

async function userLogin(email, senha) {

    const user = await loginRepo.findByEmail(email)

    if (!user) {
        throw new Error(ERRORS.USER_NOT_FOUND)
    }


    const passVerify = await bcrypt.compare(senha, user.senha) // compara a SENHA, com a USER.SENHA criptografada no banco

    if (!passVerify) {
        throw new Error(ERRORS.INVALID_LOGIN)
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