const { MESSAGES } = require("../../../messages/messages")
const { apiResponse } = require("../../../utils/response/apiRes")
const { EMAIL_REGEX } = require("../../../utils/regex/regex")
const forgotService = require("./forgotPass.service")

async function recoveryCode(req, res) {

    try{
        const { email } = req.body
        if (!email) {
            return res.status(400).json(apiResponse(
                false,
                MESSAGES.EMPTY_DATA_MSG
            ))
        }
        await forgotService.recoveryCode(email)

        return res.status(200).json(apiResponse(
            true,
            MESSAGES.FORGOT_MESSAGE
        ))

        
    } catch (error) {
        return res.status(500).json(apiResponse(
            false,
            MESSAGES.INTERNAL_ERROR_MSG
        ))
    }
}
   
module.exports = { recoveryCode }
