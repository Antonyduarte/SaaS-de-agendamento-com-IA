require("dotenv").config()
const bcrypt = require("bcrypt")
const { MESSAGES } = require("../../../messages/messages");
const resetRepo = require("./resetPassword.repository")
const REGEX = require("../../../utils/regex/regex")

async function resetPassword(email, code, password) {
    if (!email || !code || !password) {
        throw new Error(MESSAGES.EMPTY_DATA_MSG)
    }

    const user = await resetRepo.findByEmail(email)
    if (!REGEX.EMAIL_REGEX.test(email)) {
        throw new Error(MESSAGES.REGEX_MAIL)
    }

    if (!user) {
        throw new Error(MESSAGES.USER_NOT_FOUND)
    }

    const recentlyCode = await resetRepo.recentlyCode(user.id) // Busca o código mais recente gerado pelo user, de acordo com o e-mail

    if (!recentlyCode) {
        throw new Error(MESSAGES.UNVAILABLE_CODE)
    }

    const validateCode = await bcrypt.compare(String(code), recentlyCode.code_hash)
    if (!validateCode) {
        throw new Error(MESSAGES.UNVAILABLE_CODE)
    }

    const hashedPass = await bcrypt.hash(password, 10) // hashea a nova senha e manda pro banco hasheada

    const updated = await resetRepo.setPasswordAndConsumeCode(hashedPass, user.id, recentlyCode.id)
    if (!updated) {
        throw new Error(MESSAGES.UNVAILABLE_CODE)
    }

    return true
}

module.exports = {resetPassword}
