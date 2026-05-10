function apiResponse(success, message, affectedRows, data = null) {
    return {
        success: success,
        message: message,
        affectedRows: affectedRows,
        data: data,
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