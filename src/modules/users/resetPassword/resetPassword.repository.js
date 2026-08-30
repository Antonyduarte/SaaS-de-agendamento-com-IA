const mysql = require("mysql2")
const pool = require("../../../config/db/db")

async function findByEmail(email){
    
    const [result] = await pool.query("SELECT * FROM clientes WHERE email = ?", [email])

    return result[0]
}
async function recentlyCode(user_id) {

    const [rows] = await pool.query("SELECT * FROM recovery_codes WHERE user_id = ? AND expires_at > NOW() AND used = FALSE ORDER BY id DESC LIMIT 1", [user_id])

    const recoveryCode = rows[0]

    return recoveryCode
}

async function setPassword(newPassword, user_id) {

    const [result] = await pool.query("UPDATE clientes SET password = ?, used = TRUE, used_at = NOW() WHERE id = ?", [newPassword, user_id])

    return result 
}

module.exports  = { findByEmail, recentlyCode, setPassword }
