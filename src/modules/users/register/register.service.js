const registerRepo = require("./register.respository")
const bcrypt = require("bcrypt")

async function userRegister(nome, email, senha) {
    let emailExists = await registerRepo.findByEmail(email)
    if(emailExists) {
        throw new Error("EMAIL_ALREADY_EXISTS")
    }
}