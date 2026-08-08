const forgotRepo = require("./forgotPass.repository")

async function postRecovery(email) {

    const user = await forgotRepo.postRecoveryPass(email)
    if(!user) {
        throw new Error("MAIL_NOT_FOUND")
    }

    return user
}

module.exports = { postRecovery }