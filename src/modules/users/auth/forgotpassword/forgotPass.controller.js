const { MESSAGES, MSG } = require("../../../../messages/messages")
const { apiResponse } = require("../../../../utils/apiRes")
const { EMAIL_REGEX } = require("../../../../utils/regex")
const forgotService = require("./forgotPass.service")

async function postRecovery(req, res) {

    const email = req.body //Pega o email do body

    try{
        
        const emailRegex = EMAIL_REGEX.test(email)
        if (!email) {
            return res.status(400).json(apiResponse(
                false,
                MESSAGES.EMPTY_DATA_MSG
            ))
        } else if (!emailRegex) {
            return res.status(400).json(apiResponse(
                false,
                MESSAGES.REGEX_MAIL
            ))
        }

        return res.status(200).json(apiResponse(
            true,
            MSG.FORGOT_MESSAGE
        ))

    } catch(error) {
        return res.status(500).json(apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR_MSG
        ))
    }
}

async function putRecovery(id, password) {
    
}

module.exports = { postRecovery, putRecovery }