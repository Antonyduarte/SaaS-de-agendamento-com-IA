const mysql = require("mysql2")
const pool = require("../../../config/db/db")

const connection = pool

async function postRecoveryPass(email) {
    
    const [result] = await connection.query("SELECT * FROM users WHERE email = ?", [email])
    // Busca no banco pelo e-mail.
    return result
}

async function putRecoveryPass(password, id){

    const [result] = await connection.query("UPDATE users SET password = ? WHERE id = ?", [password, id])

    return result
}

module.exports = { postRecoveryPass, putRecoveryPass }