function apiResponse(success, message, rows) {
    return {
        success: success,
        message: message,
        rows: rows,
        timestamp: new Date().getTime()
    }
}
function userResponse(success, message){
    return{
        success: success,
        message: message
    }
}

module.exports = { apiResponse, userResponse }