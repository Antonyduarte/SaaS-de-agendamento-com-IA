const MESSAGES = {
    // ERROS DE AGENDAMENTO
    TIME_CONFLICT: "TIME_CONFLICT",
    INVALID_DATA: "Data inválida",
    INVALID_TIME: "Horário inválido",
    NO_APPOINTMENTS: "NO_APPOINTMENTS",
    INTERVAL_ERROR:"Erro ao agendar, ",

    //ERROS DE LOGIN/REGISTER/AUTH
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INVALID_LOGIN: "INVALID_LOGIN",
    REGEX_MAIL: "Formato inválido de e-mail",
    
    //INTERNAL SERVER ERROR
    INTERNAL_ERROR: "INTERNAL_ERROR",
    INTERNAL_ERROR_MSG: "Ocorreu um erro interno, tente novamente mais tarde",
    
    //EMPTY DATA
    EMPTY_DATA_MSG: "Certifique-se de preencher todos os campos"
} 

const MSG = {
    // Mensagem para recovey password
    FORGOT_MESSAGE: "Se este e-mail estiver cadastrado, enviaremos um código de segurança para o mesmo"
}

module.exports = { MESSAGES, MSG}
