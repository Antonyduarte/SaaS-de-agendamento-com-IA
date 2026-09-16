function apiResponse(success, message, rows) {
    return {
        success: success,
        message: message,
        rows: rows,
        timestamp: new Date().getTime()
    }
}

// Função em desuso 
// function userResponse(success, message){
//     return{
//         success: success,
//         message: message
//     }
// }

module.exports = { apiResponse }