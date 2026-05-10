const registerRepo = require("./register.respository")
const bcrypt = require("bcrypt")
const responses = require("../../../utils/apiRes")

async function userRegister(nome, email, senha) {

    let emailExists = await registerRepo.findByEmail(email)
    if(emailExists) {
        throw new Error("EMAIL_ALREADY_EXISTS")
    }
 
    const hashedPass = await bcrypt.hash(senha, 10)
    
    const user = registerRepo.userRegister(nome, email, hashedPass)

    return responses.apiResponse(true, "Conta registrada com sucesso")
}

module.exports = userRegister