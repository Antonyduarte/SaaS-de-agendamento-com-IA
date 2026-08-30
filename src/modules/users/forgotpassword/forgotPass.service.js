const forgotRepo = require("./forgotPass.repository")
const { randomInt } = require("crypto")
const { MESSAGES } = require("../../../messages/messages")
const mailer = require("../../../config/mail/mailerSend")
const { EMAIL_REGEX } = require("../../../utils/regex")
const bcrypt = require("bcrypt")

// function generateCode()

async function recoveryCode(email) {
  
  if (!email) {
    throw Error(MESSAGES.EMPTY_DATA_MSG)
  }

  if (!EMAIL_REGEX.test(email)) {
    throw Error(MESSAGES.REGEX_MAIL)
  }

  const user = await forgotRepo.userEmail(email)

  if (!user) {
    return null
  }
  // Gera o código !! LEMBRETE ==== HASHEAR CÓDIGO DEPOOIS

  const code = randomInt(100000, 1000000)
  const hashedCode = await bcrypt.hash(String(code), 10)

  // Salva o código e usuário no banco
  await forgotRepo.recoveryCode(user.id, hashedCode)

  await mailer.sendCode(email, code)

  return true
}

module.exports = { recoveryCode }